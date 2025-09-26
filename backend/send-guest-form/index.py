import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel, Field, ValidationError
from typing import Dict, Any
import datetime

class GuestFormData(BaseModel):
    name: str = Field(..., min_length=1)
    attendance: str = Field(..., pattern='^(yes|no)$')
    submitted_at: str = None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send guest RSVP form data to email
    Args: event - dict with httpMethod, body containing guest form data
          context - object with request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse form data
        body_data = json.loads(event.get('body', '{}'))
        
        # Add timestamp
        body_data['submitted_at'] = datetime.datetime.now().isoformat()
        
        # Validate data
        guest_data = GuestFormData(**body_data)
        
        # Get email configuration
        email_config_str = os.environ.get('EMAIL_SERVICE_CONFIG')
        if not email_config_str:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email configuration not found'})
            }
        
        email_config = json.loads(email_config_str)
        
        # Create email message
        attendance_text = "Буду с радостью! 🎉" if guest_data.attendance == "yes" else "К сожалению, меня не будет 😔"
        
        msg = MIMEMultipart()
        msg['From'] = email_config['user']
        msg['To'] = email_config['to']
        msg['Subject'] = f"📝 Анкета гостя: {guest_data.name}"
        
        body = f"""
Новый ответ на приглашение:

👤 Имя гостя: {guest_data.name}
📅 Ответ: {attendance_text}
🕐 Время подачи: {guest_data.submitted_at}

---
Приглашение на День Рождения Принцессы Златы
10 октября 2025 в 17:00
Ресторан «Загородный очаг»
        """
        
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        
        # Send email
        server = smtplib.SMTP(email_config['service'], 587)
        server.starttls()
        server.login(email_config['user'], email_config['pass'])
        text = msg.as_string()
        server.sendmail(email_config['user'], email_config['to'], text)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Guest form submitted successfully',
                'guest_name': guest_data.name,
                'attendance': guest_data.attendance
            })
        }
        
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid form data', 'details': str(e)})
        }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON data'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Internal server error', 'details': str(e)})
        }