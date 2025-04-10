-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-04-09 12:26:41.279

-- tables
-- Table: countries
CREATE TABLE countries (
    id serial  NOT NULL,
    name varchar(63)  NOT NULL,
    CONSTRAINT countries_pk PRIMARY KEY (id)
);

-- Table: currencies
CREATE TABLE currencies (
    id serial  NOT NULL,
    name varchar(3)  NOT NULL,
    CONSTRAINT currencies_pk PRIMARY KEY (id)
);

-- Table: exchange_rates
CREATE TABLE exchange_rates (
    id serial  NOT NULL,
    old_currency_id int  NOT NULL,
    new_currency_id int  NOT NULL,
    exchange_rate decimal(8,4)  NOT NULL,
    time timestamp  NOT NULL,
    CONSTRAINT exchange_rates_pk PRIMARY KEY (id)
);

-- Table: exchanges
CREATE TABLE exchanges (
    task_id int  NOT NULL,
    exchange_rate_id int  NOT NULL,
    CONSTRAINT exchanges_pk PRIMARY KEY (task_id,exchange_rate_id)
);

-- Table: forecasts
CREATE TABLE forecasts (
    id serial  NOT NULL,
    place_id int  NOT NULL,
    time timestamp  NOT NULL,
    temperature decimal(4,2)  NOT NULL,
    temperature_feelslike decimal(4,2)  NOT NULL,
    will_rain boolean  NOT NULL,
    wind_speed decimal(4,1)  NOT NULL,
    pressure decimal(5,1)  NOT NULL,
    rain_chance decimal(3,1)  NOT NULL,
    aq_co decimal(5,2)  NOT NULL,
    aq_no2 decimal(5,3)  NOT NULL,
    aq_pm2_5 decimal(5,3)  NOT NULL,
    aq_pm10 decimal(4,2)  NOT NULL,
    CONSTRAINT forecasts_pk PRIMARY KEY (id)
);

-- Table: meetings
CREATE TABLE meetings (
    id serial  NOT NULL,
    title varchar(63)  NOT NULL,
    description varchar(1023)  NOT NULL,
    place_id int  NOT NULL,
    forecast_id int  NOT NULL,
    time timestamp  NOT NULL,
    CONSTRAINT meetings_pk PRIMARY KEY (id)
);

-- Table: places
CREATE TABLE places (
    id serial  NOT NULL,
    name varchar(63)  NOT NULL,
    country_id int  NOT NULL,
    CONSTRAINT places_pk PRIMARY KEY (id)
);

-- Table: tasks
CREATE TABLE tasks (
    id serial  NOT NULL,
    title varchar(63)  NOT NULL,
    description varchar(1023)  NOT NULL,
    base_value money  NOT NULL,
    base_currency_id int  NOT NULL,
    CONSTRAINT tasks_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: currencies_tasks (table: tasks)
ALTER TABLE tasks ADD CONSTRAINT currencies_tasks
    FOREIGN KEY (base_currency_id)
    REFERENCES currencies (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: exchange_rates_currencies (table: exchange_rates)
ALTER TABLE exchange_rates ADD CONSTRAINT exchange_rates_currencies
    FOREIGN KEY (old_currency_id)
    REFERENCES currencies (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: exchange_rates_exchanges (table: exchanges)
ALTER TABLE exchanges ADD CONSTRAINT exchange_rates_exchanges
    FOREIGN KEY (exchange_rate_id)
    REFERENCES exchange_rates (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: exchanges_tasks (table: exchanges)
ALTER TABLE exchanges ADD CONSTRAINT exchanges_tasks
    FOREIGN KEY (task_id)
    REFERENCES tasks (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: forecasts_places (table: forecasts)
ALTER TABLE forecasts ADD CONSTRAINT forecasts_places
    FOREIGN KEY (place_id)
    REFERENCES places (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: meetings_forecasts (table: meetings)
ALTER TABLE meetings ADD CONSTRAINT meetings_forecasts
    FOREIGN KEY (forecast_id)
    REFERENCES forecasts (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: places_Table_7 (table: places)
ALTER TABLE places ADD CONSTRAINT places_Table_7
    FOREIGN KEY (country_id)
    REFERENCES countries (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: places_meetings (table: meetings)
ALTER TABLE meetings ADD CONSTRAINT places_meetings
    FOREIGN KEY (place_id)
    REFERENCES places (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

