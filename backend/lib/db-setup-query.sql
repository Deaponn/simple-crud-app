-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-04-11 14:03:31.374

-- tables
-- Table: countries
CREATE TABLE countries (
    id serial  NOT NULL,
    name varchar(63)  NOT NULL,
    CONSTRAINT countries_pk PRIMARY KEY (id)
);

-- Table: forecasts
CREATE TABLE forecasts (
    id serial  NOT NULL,
    place_id int  NOT NULL,
    temperature decimal(4,2)  NOT NULL,
    temperature_feelslike decimal(4,2)  NOT NULL,
    will_rain boolean  NOT NULL,
    rain_chance decimal(4,1)  NOT NULL,
    wind_speed decimal(4,1)  NOT NULL,
    pressure decimal(5,1)  NOT NULL,
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

-- foreign keys
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

