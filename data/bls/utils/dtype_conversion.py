import numpy as np


def to_float(x: str):
    try: 
        return(float(x))
    except:
        return np.nan


def to_int(x: str):
    try: 
        return(int(x))
    except:
        return np.nan
