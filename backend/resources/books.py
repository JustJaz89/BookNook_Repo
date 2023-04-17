from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, reviews_schema, favorite_schema, favorties_schema

class UserReviewsResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review = review_schema.load(form_data)
        new_review.user_id = user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201
    
class UserFavoritesResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.filter_by(user_id=user_id)
        return favorties_schema.dump(user_favorites), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_favorite = favorite_schema.load(form_data)
        new_favorite.user_id = user_id
        db.session.add(new_favorite)
        db.session.commit()
        return favorite_schema.dump(new_favorite), 201
    
class GetBookInformationResource(Resource):
    def get(self, book_id):
        reviews = Review.query.filter_by(book_id=book_id)
        avg_rating = round(sum(review.rating for review in reviews) / len(reviews), 2)
        user_id = request.current.user_id
        is_favorited = Favorite.query.filter_by(book_id=book_id, user_id=user_id).first() is not None
        response = {
            "reviews": reviews,
            "average_rating": avg_rating,
            "is_favorited": is_favorited
        }
        return response, 200