import csv
with open("worldfirearms.csv","rb") as source:
    rdr= csv.reader( source )
    with open("worldfirearms2.csv","wb") as result:
        wtr= csv.writer( result )
        for r in rdr:
            wtr.writerow([r[0], r[3], r[5], r[6], r[7], r[8]] )