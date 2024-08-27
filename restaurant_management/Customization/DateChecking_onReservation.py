# reservation_validation.py

from frappe import _
import frappe
def validate_reservation(doc, method):
    if doc.status == "Confirmed":
        # Ensure `end_time` is after `reservation_time`
        if doc.end_time <= doc.reservation_time:
            frappe.throw(_("End time must be after the reservation start time."))

        # Check for any overlap with existing confirmed reservations
        overlapping_reservations = frappe.get_all("Reservation", filters={
            "table": doc.table,
            "status": "Confirmed",
            "reservation_date": doc.reservation_date,
            "reservation_time": ["<", doc.end_time],
            "end_time": [">", doc.reservation_time],
            "name": ["!=", doc.name]
        })

        if overlapping_reservations:
            frappe.throw(_("The selected table is already reserved during this time slot. Please choose another table or time."))
