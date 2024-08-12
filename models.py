from app import db

class Customer(db.Model):
    __tablename__ = 'customers'
    CustomerID = db.Column(db.Integer, primary_key=True)
    FullName = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), unique=True, nullable=False)
    
    # Relationship with PurchaseDate
    purchase_dates = db.relationship('PurchaseDate', backref='customer', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'CustomerID': self.CustomerID,
            'FullName': self.FullName,
            'Email': self.Email
        }

class PurchaseDate(db.Model):
    __tablename__ = 'purchase_dates'
    PurchaseDateID = db.Column(db.Integer, primary_key=True)
    CustomerID = db.Column(db.Integer, db.ForeignKey('customers.CustomerID', ondelete='CASCADE'), nullable=False)
    PurchaseDate = db.Column(db.Date, nullable=False)

    # Relationship with Item
    items = db.relationship('Item', backref='purchase_date', cascade='all, delete-orphan')

class Item(db.Model):
    __tablename__ = 'items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemDescription = db.Column(db.String(200), nullable=False)
    ItemPrice = db.Column(db.Float, nullable=False)
    Size = db.Column(db.String(50), nullable=True)
    ItemizedReceipt = db.Column(db.Boolean, nullable=True)
    PurchaseDateID = db.Column(db.Integer, db.ForeignKey('purchase_dates.PurchaseDateID', ondelete='CASCADE'), nullable=False)

