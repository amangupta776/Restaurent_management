import frappe
from frappe.utils import today

@frappe.whitelist()
def get_daily_reservation_count():
    count = frappe.db.count(
        'Reservation',
        filters={'reservation_date': today()}
    )
    if not count:
        return 0
    return {"value":count}

@frappe.whitelist()
def get_daily_order_count():
    count = frappe.db.count(
        'Order',
        filters={'order_date': today()}
    )
    if not count:
        return 0
    return {"value":count}
@frappe.whitelist()
def total_daily_sale():
    # Get today's date
    date = today()

    # Execute a parameterized SQL query to avoid SQL injection
    total_today_sale = frappe.db.sql("""
        SELECT
            SUM(total_amount) 
        FROM
            `tabOrder`
        WHERE
            status = 'Completed' AND order_date = %s
    """, (date,), as_dict=True)
    
    # Check if the result is None and return 0 in that case
    total_sale_value = total_today_sale[0]['SUM(total_amount)'] if total_today_sale and total_today_sale[0]['SUM(total_amount)'] is not None else 0

    # Return the total sale value as a dictionary
    return {"value": total_sale_value}
