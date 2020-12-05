--
-- File generated with SQLiteStudio v3.2.1 on Tue Aug 18 20:27:51 2020
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: onet_task_categories
DROP TABLE IF EXISTS onet_task_categories;

CREATE TABLE onet_task_categories (
    [Scale ID],
    Category,
    [Category Description]
);

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '1',
                                     'Yearly or less'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '2',
                                     'More than yearly'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '3',
                                     'More than monthly'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '4',
                                     'More than weekly'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '5',
                                     'Daily'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '6',
                                     'Several times daily'
                                 );

INSERT INTO onet_task_categories (
                                     [Scale ID],
                                     Category,
                                     [Category Description]
                                 )
                                 VALUES (
                                     'FT',
                                     '7',
                                     'Hourly or more'
                                 );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
