FROM python:3.11.4-alpine3.17

WORKDIR /backend

COPY requirements.txt /temp/requirements.txt
COPY . /backend

RUN pip install -r /temp/requirements.txt
RUN adduser --disabled-password user-backend

EXPOSE 8000