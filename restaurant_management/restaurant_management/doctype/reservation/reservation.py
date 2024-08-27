# Copyright (c) 2024, Aman and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
from frappe import _
class Reservation(Document):
    def validate(self):
        if self.status == "Confirmed":
        # Ensure `end_time` is after `reservation_time`
            if self.end_time <= self.reservation_time:
                frappe.throw(_("End time must be after the reservation start time."))

        # Check for any overlap with existing confirmed reservations
        overlapping_reservations = frappe.get_all("Reservation", filters={
            "table": self.table,
            "status": "Confirmed",
            "reservation_date": self.reservation_date,
            "reservation_time": ["<", self.end_time],
            "end_time": [">", self.reservation_time],
            "name": ["!=", self.name]
        })

        if overlapping_reservations:
            frappe.throw(_("The selected table is already reserved during this time slot. Please choose another table or time."))

  


    def on_update(self):
        """Triggered when a Reservation doctype is updated."""
        frappe.msgprint(".....")
        if self.status == 'Confirmed':
            subject = f"Your Reservation is Confirmed"
            message = f"""
 <p>Dear {self.customer},</p>
    <p>Your reservation at our restaurant has been confirmed.</p>
    <p>Details:</p>
    <ul>
        <li>Reservation Date: {self.reservation_date}</li>
        <li>Reservation Time: {self.reservation_time} - {self.end_time}</li>
        <li>Table: {self.table}</li>
        <li>Number of People: {self.number_of_people}</li>
    </ul>
    <p>We look forward to serving you.</p>
    <p>Best Regards,<br>Flavours & Flames</p>
    """
            recipients = [self.customer]
            frappe.sendmail(recipients=recipients, subject=subject, message=message ,delayed=False)
        elif self.status == 'Cancelled':
            subject = f"Your Reservation is Cancelled"
            message = f"""
 <p>Dear {self.customer},</p>
    <p>Your reservation at our restaurant has been Cancelled.</p>
    <p>Details:</p>
    <ul>
        <li>Reservation Date: {self.reservation_date }</li>
        <li>Reservation Time: {self.reservation_time} - {self.end_time or ""}</li>
        <li>Table: {self.table}</li>
        <li>Number of People: {self.number_of_people}</li>
    </ul>
    <p>Best Regards,<br>Flavours & Flames</p>
    """
            recipients = [self.customer]
            frappe.sendmail(recipients=recipients, subject=subject, message=message ,delayed=False)


