# from email.message import EmailMessage
# # from server.models.request import Request
# # from server.repository import DBAdaptor
# from server.utils.exception_handler import ErrorMessage
# from server.configs import app_configs
# from server.schemas import ServiceResultModel
# from server.schemas.Request_schema import (
#     RequestSchema,
#     VolunteerSchema
# )
# import smtplib
# from pydantic import ValidationError
# from server.utils.helper import get_html_template
# from datetime import datetime


# class RequestFormServices:
#     def form_submit(
#             self,
#             requestform: RequestSchema,
#             attachment: bytes,
#             filename: str,
#             file_type: str
#         ) -> ServiceResultModel:
#         result = ServiceResultModel()
#         try:
#             form = RequestSchema.model_validate(requestform)
#             message = EmailMessage()
#             message['from'] = app_configs.email_settings.MAIL_USERNAME
#             message['to'] = app_configs.email_settings.MAIL_TO
#             message['Subject'] = f"Service request from {form.company_name.capitalize()}"
#             message.add_alternative(get_html_template('colauncha_mail.html', **form.model_dump()), subtype='html')
#             # print(message)

#             if attachment and filename and file_type:
#                 message.add_attachment(
#                     attachment,
#                     maintype=file_type.split('/')[0],
#                     subtype=file_type.split('/')[1],
#                     filename=filename
#                 )
#             with smtplib.SMTP(
#                 app_configs.email_settings.MAIL_SERVER,
#                 app_configs.email_settings.MAIL_PORT, timeout=10
#             ) as server:
#                 server.starttls()
#                 server.login(
#                     app_configs.email_settings.MAIL_USERNAME,
#                     app_configs.email_settings.MAIL_PASSWORD
#                 )
#                 server.send_message(message)
#                 message.clear_content()

#             result.data = {"message": "Request submitted successfully"}
#             return result
#         except (Exception, ValidationError, smtplib.SMTPException) as e:
#             message.clear_content()
#             result.add_error(str(e))
#             print(f'Error type: {type(e)}\nError: {e}')
#             raise ErrorMessage(
#                 message="Something went wrong with sending request", 
#                 status_code=500,
#                 detail="Error on server side"
#             )

#     def form_submit_company(
#             self, requestform: RequestSchema,
#             filename: str
#         ) -> ServiceResultModel:

#         result = ServiceResultModel()
#         try:
#             form = RequestSchema.model_validate(requestform)
#             parameters = form.model_dump()
#             parameters['filename'] = filename if filename else None
#             parameters['current_year'] = datetime.now().strftime('%Y')
#             message_company = EmailMessage()
#             message_company["From"] = app_configs.email_settings.MAIL_USERNAME
#             message_company["To"] = form.email
#             message_company["Subject"] = "Talent request form submitted successfully"
#             message_company.add_alternative(
#                 get_html_template('company_mail.html', **parameters),
#                 subtype='html'
#             )

#             with smtplib.SMTP(
#                 app_configs.email_settings.MAIL_SERVER,
#                 app_configs.email_settings.MAIL_PORT,
#             ) as server:
#                 server.starttls()
#                 server.login(
#                     app_configs.email_settings.MAIL_USERNAME,
#                     app_configs.email_settings.MAIL_PASSWORD
#                 )
#                 server.send_message(message_company)
#                 message_company.clear_content()

#             result.data = {"message": "Request submitted successfully"}
#             return result

#         except (Exception, ValidationError, smtplib.SMTPException) as e:
#             message_company.clear_content()
#             result.add_error(str(e))
#             print(f'Error type: {type(e)}\nError: {e}')
#             raise ErrorMessage(
#                 message="Something went wrong with sending request", 
#                 status_code=500,
#                 detail="Error on server side"
#             )
        
# # Talent volunteer
#     def volunteer_submit_colauncha(
#             self,
#             requestform: VolunteerSchema,
#             attachment: bytes,
#             filename: str,
#             file_type: str
#         ) -> ServiceResultModel:
#         result = ServiceResultModel()
#         try:
#             form = VolunteerSchema.model_validate(requestform)
#             message = EmailMessage()
#             message['from'] = app_configs.email_settings.MAIL_USERNAME
#             message['to'] = app_configs.email_settings.MAIL_TO
#             message['Subject'] = f"Volunteer request from {form.name.capitalize()}"
#             message.add_alternative(get_html_template('talent_colauncha.html', **form.model_dump()), subtype='html')
#             # print(message)

#             if attachment and filename and file_type:
#                 message.add_attachment(
#                     attachment,
#                     maintype=file_type.split('/')[0],
#                     subtype=file_type.split('/')[1],
#                     filename=filename
#                 )

#             with smtplib.SMTP(
#                 app_configs.email_settings.MAIL_SERVER,
#                 app_configs.email_settings.MAIL_PORT,
#             ) as server:
#                 server.starttls()
#                 server.login(
#                     app_configs.email_settings.MAIL_USERNAME,
#                     app_configs.email_settings.MAIL_PASSWORD
#                 )
#                 server.send_message(message)
#                 message.clear_content()

#             result.data = {"message": "Request submitted successfully"}
#             return result

#         except (Exception, ValidationError, smtplib.SMTPException) as e:
#             message.clear_content()
#             result.add_error(str(e))
#             print(f'Error type: {type(e)}\nError: {e}')
#             raise ErrorMessage(
#                 message="Something went wrong with sending request", 
#                 status_code=500,
#                 detail="Error on server side"
#             )

#     def volunteer_submit(
#             self, requestform: VolunteerSchema,
#             filename: str
#         ) -> ServiceResultModel:

#         result = ServiceResultModel()
#         try:
#             form = VolunteerSchema.model_validate(requestform)
#             parameters = form.model_dump()
#             parameters['filename'] = filename if filename else None
#             parameters['current_year'] = datetime.now().strftime('%Y')
#             message_company = EmailMessage()
#             message_company["From"] = app_configs.email_settings.MAIL_USERNAME
#             message_company["To"] = form.email
#             message_company["Subject"] = "Talent request form submitted successfully"
#             message_company.add_alternative(
#                 get_html_template('talent_mail.html', **parameters),
#                 subtype='html'
#             )

#             with smtplib.SMTP(
#                 app_configs.email_settings.MAIL_SERVER,
#                 app_configs.email_settings.MAIL_PORT,
#             ) as server:
#                 server.starttls()
#                 server.login(
#                     app_configs.email_settings.MAIL_USERNAME,
#                     app_configs.email_settings.MAIL_PASSWORD
#                 )
#                 server.send_message(message_company)
#                 message_company.clear_content()

#             result.data = {"message": "Request submitted successfully"}
#             return result

#         except (Exception, ValidationError, smtplib.SMTPException) as e:
#             message_company.clear_content()
#             result.add_error(str(e))
#             print(f'Error type: {type(e)}\nError: {e}')
#             raise ErrorMessage(
#                 message="Something went wrong with sending request", 
#                 status_code=500,
#                 detail="Error on server side"
#             )

from email.message import EmailMessage
from server.utils.exception_handler import ErrorMessage
from server.configs import app_configs
from server.schemas.Request_schema import RequestSchema, VolunteerSchema
import smtplib
from pydantic import ValidationError, BaseModel
from server.utils.helper import get_html_template
from datetime import datetime
from typing import Optional, Union


class RequestFormServices:
    
    def _create_smtp_connection(self):
        """Create and return an authenticated SMTP connection."""
        print(f'Connection parameters:\n\
            {app_configs.email_settings.MAIL_SERVER}\n\
            {app_configs.email_settings.MAIL_PORT}\n\
            {app_configs.email_settings.MAIL_USERNAME}\n\
            {app_configs.email_settings.MAIL_PASSWORD}\n\
        ')
        server = smtplib.SMTP_SSL(
            app_configs.email_settings.MAIL_SERVER,
            app_configs.email_settings.MAIL_PORT,
            timeout=30
        )
        server.login(
            app_configs.email_settings.MAIL_USERNAME,
            app_configs.email_settings.MAIL_PASSWORD
        )
        print("SMTP connection successful!")
        return server
    
    def _create_email_message(
        self,
        to_email: str,
        subject: str,
        template_name: str,
        template_params: dict,
        attachment: Optional[bytes] = None,
        filename: Optional[str] = None,
        file_type: Optional[str] = None
    ) -> EmailMessage:
        """Create an email message with optional attachment."""
        message = EmailMessage()
        message['From'] = app_configs.email_settings.MAIL_USERNAME
        message['To'] = to_email
        message['Subject'] = subject
        message.add_alternative(
            get_html_template(template_name, **template_params),
            subtype='html'
        )
        
        if attachment and filename and file_type:
            message.add_attachment(
                attachment,
                maintype=file_type.split('/')[0],
                subtype=file_type.split('/')[1],
                filename=filename
            )
        
        return message
    
    def _send_email(self, message: EmailMessage) -> None:
        """Send email message using SMTP connection."""
        with self._create_smtp_connection() as server:
            server.send_message(message)
            message.clear_content()
    
    def _handle_email_operation(
        self,
        operation_func,
        error_message: str = "Something went wrong with sending request"
    ):
        """Handle email operation with consistent error handling."""
        try:
            operation_func()
            result = {"message": "Request submitted successfully"}
            return result
        except (Exception, ValidationError, smtplib.SMTPException) as e:
            print(f'Error type: {type(e)}\nError: {e}')
            raise ErrorMessage(
                message=error_message,
                status_code=500,
                detail="Error on server side"
            )
    
    def _validate_and_prepare_form_data(
        self,
        form_data: Union[RequestSchema, VolunteerSchema],
        filename: Optional[str] = None
    ) -> tuple[BaseModel, dict]:
        """Validate form data and prepare template parameters."""
        if isinstance(form_data, RequestSchema):
            form = RequestSchema.model_validate(form_data)
        else:
            form = VolunteerSchema.model_validate(form_data)
        
        parameters = form.model_dump()
        parameters['current_year'] = datetime.now().strftime('%Y')
        if filename is not None:
            parameters['filename'] = filename
        
        return form, parameters
    
    def form_submit(
        self,
        requestform: RequestSchema,
        attachment: bytes,
        filename: str,
        file_type: str
    ):
        """Submit service request form to Colauncha."""
        def send_operation():
            form, _ = self._validate_and_prepare_form_data(requestform)
            message = self._create_email_message(
                to_email=app_configs.email_settings.MAIL_TO,
                subject=f"Service request from {form.company_name.capitalize()}",
                template_name='colauncha_mail.html',
                template_params=form.model_dump(),
                attachment=attachment,
                filename=filename,
                file_type=file_type
            )
            self._send_email(message)
        
        return self._handle_email_operation(send_operation)
    
    def form_submit_company(
        self,
        requestform: RequestSchema,
        filename: str
    ):
        """Send confirmation email to company."""
        def send_operation():
            form, parameters = self._validate_and_prepare_form_data(requestform, filename)
            message = self._create_email_message(
                to_email=form.email,
                subject="Talent request form submitted successfully",
                template_name='company_mail.html',
                template_params=parameters
            )
            self._send_email(message)
        
        return self._handle_email_operation(send_operation)
    
    def volunteer_submit_colauncha(
        self,
        requestform: VolunteerSchema,
        attachment: bytes,
        filename: str,
        file_type: str
    ):
        """Submit volunteer request form to Colauncha."""
        def send_operation():
            form, _ = self._validate_and_prepare_form_data(requestform)
            message = self._create_email_message(
                to_email=app_configs.email_settings.MAIL_TO,
                subject=f"Volunteer request from {form.name.capitalize()}",
                template_name='talent_colauncha.html',
                template_params=form.model_dump(),
                attachment=attachment,
                filename=filename,
                file_type=file_type
            )
            self._send_email(message)
        
        return self._handle_email_operation(send_operation)
    
    def volunteer_submit(
        self,
        requestform: VolunteerSchema,
        filename: str
    ):
        """Send confirmation email to volunteer."""
        def send_operation():
            form, parameters = self._validate_and_prepare_form_data(requestform, filename)
            message = self._create_email_message(
                to_email=form.email,
                subject="Talent request form submitted successfully",
                template_name='talent_mail.html',
                template_params=parameters
            )
            self._send_email(message)
        
        return self._handle_email_operation(send_operation)

# The code has been refactored to improve readability, maintainability, and error handling.
    def submit_enquiry():
        ...