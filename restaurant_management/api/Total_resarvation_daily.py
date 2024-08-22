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
    total_toady_sale=frappe.db.sql("""SELECT
    SUM(total_amount) 
FROM
    `tabOrder`
WHERE
    status = 'Completed'
GROUP BY
    order_date
ORDER BY
    order_date DESC;""")
    return {"value":total_toady_sale[0][0]}