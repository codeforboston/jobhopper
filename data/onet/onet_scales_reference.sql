--
-- File generated with SQLiteStudio v3.2.1 on Tue Aug 18 20:25:31 2020
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: onet_scales_reference
DROP TABLE IF EXISTS onet_scales_reference;

CREATE TABLE onet_scales_reference (
    [Scale ID],
    [Scale Name],
    Minimum,
    Maximum
);

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'AO',
                                      'Automation',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CF',
                                      'Frequency',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CN',
                                      'Amount of Contact',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CT',
                                      'Context',
                                      '1',
                                      '3'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CTP',
                                      'Context (Categories 1-3)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CX',
                                      'Context',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'CXP',
                                      'Context (Categories 1-5)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'EX',
                                      'Extent',
                                      '1',
                                      '7'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'FM',
                                      'Amount of Freedom',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'FT',
                                      'Frequency of Task (Categories 1-7)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'HW',
                                      'Hours Per Week',
                                      '1',
                                      '3'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'IH',
                                      'Occupational Interest High-Point',
                                      '0',
                                      '6'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'IJ',
                                      'Importance',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'IM',
                                      'Importance',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'IP',
                                      'Impact of Decisions',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'LC',
                                      'Level of Competition',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'LV',
                                      'Level',
                                      '0',
                                      '7'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'OI',
                                      'Occupational Interests',
                                      '1',
                                      '7'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'OJ',
                                      'On-The-Job Training (Categories 1-9)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'PT',
                                      'On-Site Or In-Plant Training (Categories 1-9)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'PX',
                                      'Proximity',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'RE',
                                      'Responsibility',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'RL',
                                      'Required Level Of Education (Categories 1-12)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'RT',
                                      'Relevance of Task',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'RW',
                                      'Related Work Experience (Categories 1-11)',
                                      '0',
                                      '100'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'SR',
                                      'How Serious',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'TI',
                                      '% Time',
                                      '1',
                                      '5'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'VH',
                                      'Work Value High-Point',
                                      '1',
                                      '6'
                                  );

INSERT INTO onet_scales_reference (
                                      [Scale ID],
                                      [Scale Name],
                                      Minimum,
                                      Maximum
                                  )
                                  VALUES (
                                      'WS',
                                      'Work Schedule',
                                      '1',
                                      '3'
                                  );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
