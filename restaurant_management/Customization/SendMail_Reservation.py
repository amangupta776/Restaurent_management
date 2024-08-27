import frappe
from frappe import _

def send_confirmation_email(doc,subject,message):
    """Send a confirmation email to the customer."""
    recipients = [doc.customer]
    frappe.sendmail(recipients=recipients, subject=subject, message=message ,delayed=False)

def on_update(doc, method):
    """Triggered when a Reservation doctype is updated."""
    if doc.status == 'Confirmed':
        subject = f"Your Reservation is Confirmed"
        message = f"""
 <p>Dear {doc.customer},</p>
    <p>Your reservation at our restaurant has been confirmed.</p>
    <p>Details:</p>
    <ul>
        <li>Reservation Date: {doc.reservation_date}</li>
        <li>Reservation Time: {doc.reservation_time} - {doc.end_time}</li>
        <li>Table: {doc.table}</li>
        <li>Number of People: {doc.number_of_people}</li>
    </ul>
    <p>We look forward to serving you.</p>
    <p>Best Regards,<br>Flavours & Flames</p>
    """
        send_confirmation_email(doc,subject,message)
    elif doc.status == 'Cancelled':
        subject = f"Your Reservation is Cancelled"
        message = f"""
 <p>Dear {doc.customer},</p>
    <p>Your reservation at our restaurant has been Cancelled.</p>
    <p>Details:</p>
    <ul>
        <li>Reservation Date: {doc.reservation_date}</li>
        <li>Reservation Time: {doc.reservation_time} - {doc.end_time}</li>
        <li>Table: {doc.table}</li>
        <li>Number of People: {doc.number_of_people}</li>
    </ul>
    <p>Best Regards,<br>Flavours & Flames</p>
    """
        send_confirmation_email(doc,subject,message)

