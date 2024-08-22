# custom_app/api.py

import frappe
from frappe import _

def create_customer_from_user(doc, method):
    # Check if user already has a customer
    customer_role = frappe.get_doc("Role", {"role_name": "Customer"})
    if customer_role:
        doc.add_roles("Customer")
    if not frappe.db.exists("Customer", {"user": doc.name}):
        customer = frappe.get_doc({
            "doctype": "Customer",
            "customer_name": doc.full_name,
            "email":doc.email 
        })
        customer.insert(ignore_permissions=True)
        frappe.db.commit()
    else:
        frappe.log_error(f"Customer already exists for user {doc.name}", "Customer Creation")
