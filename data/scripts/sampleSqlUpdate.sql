create table tblprior as select * from tbl
UPDATE 
      tbl
SET val1 = (SELECT val1
                  FROM tblprior
                  WHERE rowid+1 = tbl.rowid) 
where val1 = ''
