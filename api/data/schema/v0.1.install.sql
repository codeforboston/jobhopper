CREATE TABLE orig_soc_hierarchy (
    detailedoccupation TEXT,
    detailedname       TEXT,
    majorgroup         TEXT,
    minorgroup         TEXT,
    broadgroup         TEXT,
    majorname          TEXT,
    minorname          TEXT,
    broadname          TEXT
);

CREATE TABLE orig_occupation_transitions_public_data_set (
    soc1             TEXT,
    soc2             TEXT, 
    total_obs        REAL,
    transition_share REAL,
    soc1_name        TEXT,
    soc2_name        TEXT
);

