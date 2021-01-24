import psycopg2
import psycopg2.extras as ext
import urllib.parse as urlparse
import os

url = urlparse.urlparse(os.environ["DATABASE_URL"])
print(url)
dbname = url.path[1:]
user = url.username
password = url.password
host = url.hostname
port = url.port




def run_sql(sql, values = None):
    conn = None
    results = []

    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
            )
        cur = conn.cursor(cursor_factory=ext.DictCursor)
        cur.execute(sql, values)
        conn.commit()
        results = cur.fetchall()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return results
