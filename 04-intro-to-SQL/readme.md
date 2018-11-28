# Intro to SQL

1. Install the SQLite Browser if you haven't already [here](http://sqlitebrowser.org/)
2. Open the SQLite Browser and click 'File -> Open DataBase'
3. Choose the `chinook.db` file from this repo. This database is open source and maintained by Microsoft (SQL is no fun if you don't have any data)
4. Click the tab that says 'Execute SQL'. Type SQL queries in the box above. Press the play button. See the results of that query in the box below

## sqlite3 formatting

```sql
.mode column
.headers on
```

## Joins explained

[Link](http://blog.seldomatt.com/blog/2012/10/17/about-sql-joins-the-3-ring-binder-model/)

## Query examples

1. Write the SQL to return all of the rows in the artists table?
```SQL
  select * from artists;
```

```SQL
  SELECT * FROM artists;
```

2. Write the SQL to select the artist with the name "Black Sabbath"

```SQL
  select * from artists where name="Black Sabbath";
```

3. Write the SQL to create a table named 'fans' with an auto-incrementing ID that's a primary key and a name field of type text

```sql
  create table fans (
    id integer primary key,
    name text
  );
```

4. Write the SQL to alter the fans table to have an artist_id column type integer?

```sql
  alter table fans add column artists_id integer;
```

5. Write the SQL to add yourself as a fan of the Black Eyed Peas? ArtistId **169**

```sql
  insert into fans (
      name,
      artists_id
    )
    values (
      "Valeria",
      169
    );
```


7. Write the SQL to return fans that are not fans of the black eyed peas.

```sql
  select * from fans where artists_id != 169;
```

8. Write the SQL to display all artists's names next to their album titles

```sql
  
```
