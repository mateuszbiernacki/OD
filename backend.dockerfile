FROM python:3.10

EXPOSE 5000
WORKDIR /backend

COPY backend/ /backend
RUN pip install -r requirements.txt

ENTRYPOINT ["python", "main.py"]