CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY() RETURNS 
TRIGGER LANGUAGE PLPGSQL AS $$ 
	BEGIN IF EXISTS (
	        SELECT "PatientPersonId"
	        FROM "Appointements"
	        WHERE
	            "DoctorPersonId" = NEW."DoctorPersonId"
	            AND "PatientPersonId" = NEW."PatientPersonId"
	            AND appointement_date <= NEW.appointement_date + interval '1 minutes' * NEW.appointement_duration_minutes
	            AND NEW.appointement_date <= appointement_date + interval '1 minutes' * appointement_duration_minutes
	    ) THEN RAISE NOTICE 'NOPE';
	RETURN null;
	END IF;
	RETURN NEW;
	END;
$$; 

CREATE OR REPLACE TRIGGER CHECK_AVAILABILITY_TIME 
	BEFORE
	INSERT
	    ON "Appointements" FOR EACH ROW
	EXECUTE
	    PROCEDURE check_availability();
; 

INSERT INTO
    "Appointements" (
        "appointement_date",
        "appointement_duration_minutes",
        "appointement_reason",
        "createdAt",
        "updatedAt",
        "DoctorPersonId",
        "PatientPersonId"
    )
VALUES (
        now(),
        20,
        'teests',
        now(),
        now(),
        2,
        1
    );