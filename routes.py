from flask import Blueprint, request, jsonify
from models import db, Customer, PurchaseDate, Item
import logging

main = Blueprint('main', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the Clementine LLC API"})

@main.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        if data['username'] == 'ClementineUser' and data['password'] == 'ThriftStores':
            return jsonify({'success': True}), 200
        return jsonify({'success': False}), 401
    except Exception as e:
        logger.error(f"Error during login: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@main.route('/add-customer', methods=['POST'])
def add_customer():
    try:
        data = request.get_json()

        # Create and add a new customer
        customer = Customer(
            FullName=data['FullName'],
            Email=data['Email'],
        )
        db.session.add(customer)
        db.session.commit()  # Commit to get the customer ID

        # Create and add the purchase date associated with the customer
        purchase_date = PurchaseDate(
            CustomerID=customer.CustomerID,
            PurchaseDate=data['Date']  # Assuming Date is passed in the correct format
        )
        db.session.add(purchase_date)
        db.session.commit()  # Commit to get the purchase date ID

        # Create and add each item associated with the purchase date
        for item in data['Items']:
            new_item = Item(
                ItemDescription=item['ItemDescription'],
                ItemPrice=item['ItemPrice'],
                Size=item['Size'],
                ItemizedReceipt=None,  # Explicitly setting ItemizedReceipt to null
                PurchaseDateID=purchase_date.PurchaseDateID
            )
            db.session.add(new_item)
        
        db.session.commit()  # Final commit for all items

        return jsonify({"success": True}), 201
    except Exception as e:
        logger.error(f"Error adding customer: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/customers', methods=['GET'])
def get_customers():
    query = request.args.get('query')
    customers = Customer.query.filter((Customer.FullName.like(f'%{query}%')) | (Customer.Email.like(f'%{query}%'))).all()
    return jsonify([customer.to_dict() for customer in customers])

@main.route('/customer/<int:id>', methods=['GET'])
def get_customer(id):
    try:
        customer = Customer.query.get_or_404(id)
        return jsonify(customer.to_dict())
    except Exception as e:
        logger.error(f"Error fetching customer data: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/customer/<int:id>/dates', methods=['GET'])
def get_purchase_dates(id):
    try:
        purchase_dates = PurchaseDate.query.filter_by(CustomerID=id).all()
        return jsonify([{
            'PurchaseDateID': date.PurchaseDateID,
            'PurchaseDate': date.PurchaseDate.strftime('%Y-%m-%d')
        } for date in purchase_dates])
    except Exception as e:
        logger.error(f"Error fetching purchase dates: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/date/<int:id>/details', methods=['GET'])
def get_date_details(id):
    try:
        purchase_date = PurchaseDate.query.get_or_404(id)
        items = [{
            'ItemID': item.ItemID,
            'ItemDescription': item.ItemDescription,
            'ItemPrice': item.ItemPrice,
            'Size': item.Size
        } for item in purchase_date.items]
        
        purchase_date_details = {
            'PurchaseDateID': purchase_date.PurchaseDateID,
            'CustomerID': purchase_date.CustomerID,
            'PurchaseDate': purchase_date.PurchaseDate.strftime('%Y-%m-%d'),
            'items': items
        }
        return jsonify({'purchase_date_details': purchase_date_details})
    except Exception as e:
        logger.error(f"Error fetching date details: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/customer/<int:id>', methods=['PUT'])
def update_customer(id):
    try:
        data = request.get_json()
        customer = Customer.query.get_or_404(id)
        customer.FullName = data['FullName']
        customer.Email = data['Email']
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        logger.error(f"Error updating customer: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/customer/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        customer = Customer.query.get_or_404(id)
        db.session.delete(customer)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        logger.error(f"Error deleting customer: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@main.route('/date/<int:id>', methods=['DELETE'])
def delete_date(id):
    try:
        purchase_date = PurchaseDate.query.get_or_404(id)
        db.session.delete(purchase_date)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        logger.error(f"Error deleting date: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

