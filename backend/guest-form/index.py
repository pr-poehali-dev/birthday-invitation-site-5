import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обрабатывает анкету гостя и отправляет уведомление на email
    Args: event с данными формы (name, attendance), context с метаданными
    Returns: JSON ответ о статусе отправки
    '''
    method = event.get('httpMethod', 'GET')
    
    # CORS для всех запросов
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
        'Access-Control-Max-Age': '86400'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Только POST запросы разрешены'})
        }
    
    try:
        # Получаем данные из формы
        body_data = json.loads(event.get('body', '{}'))
        guest_name = body_data.get('name', '').strip()
        attendance = body_data.get('attendance', '')
        
        if not guest_name or not attendance:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Имя и ответ обязательны для заполнения'})
            }
        
        # Получаем настройки email из секретов
        email_config_str = os.environ.get('EMAIL_SERVICE_CONFIG')
        if not email_config_str:
            return {
                'statusCode': 500,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Email не настроен'})
            }
        
        email_config = json.loads(email_config_str)
        
        # Формируем текст письма
        attendance_text = "Буду с радостью! 🎉" if attendance == "yes" else "К сожалению меня не будет 😢"
        current_time = datetime.now().strftime("%d.%m.%Y в %H:%M")
        
        email_body = f"""
        Новый ответ на приглашение:

        👤 Имя гостя: {guest_name}
        📅 Ответ: {attendance_text}
        🕐 Время подачи: {current_time}

        ---
        Приглашение на День Рождения Принцессы Златы
        10 октября 2025 в 17:00
        Ресторан «Загородный очаг», зал веранда
        Подушкинское ш., 9, Одинцово
        """
        
        # Отправляем email
        msg = MIMEMultipart()
        msg['From'] = email_config['user']
        msg['To'] = email_config['to'] 
        msg['Subject'] = f"📝 Анкета гостя: {guest_name}"
        
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        # Подключаемся к SMTP серверу
        server = smtplib.SMTP(email_config['service'], 587)
        server.starttls()
        server.login(email_config['user'], email_config['pass'])
        
        # Отправляем письмо
        server.sendmail(email_config['user'], email_config['to'], msg.as_string())
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'message': f'Спасибо, {guest_name}! Ваш ответ получен.'
            })
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Некорректный формат данных'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
        }