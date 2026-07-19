FROM python:3.12-rc-bookworm

WORKDIR /app

COPY .  /app

RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_APP=app.py

CMD ["flask", "run", "--host=0.0.0.0"]
