from flask import Flask, request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, reviews_schema, favorite_schema, favorites_schema
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restful import Api, Resource


app = Flask(__name__)

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
CORS(app)
Migrate(app, db)


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
        return favorites_schema.dump(user_favorites), 200
    
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
        reviews = reviews_schema.dump(reviews)
        avg_rating = round(sum(review['rating'] for review in reviews) / len(reviews), 2)
        response = {
            "book_id": book_id,
            "reviews": reviews,
            "average_rating": avg_rating,
        }
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            is_favorited = Favorite.query.filter_by(book_id=book_id, user_id=user_id).first() is not None
            response['is_favorited'] = is_favorited
        except:
            pass
        
        return response, 200
    
class ReviewDetailResource(Resource):
    @jwt_required()
    def put(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {'message': 'Review not found'}, 404

        data = request.get_json()
        review.title = data.get('title', review.title)
        review.content = data.get('content', review.content)

        db.session.commit()

        return review.serialize(), 200
    
    @jwt_required()
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {'message': 'Review not found'}, 404

        db.session.delete(review)
        db.session.commit()

        return '', 204


# Routes
api.add_resource(UserReviewsResource, '/api/reviews/')
api.add_resource(GetBookInformationResource, '/api/reviews/:<book_id>')
