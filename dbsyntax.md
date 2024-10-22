# Response
Each method listed below returns a Promise<ResultSet>:

Property	Type	Description
rows	Array<Row>	An array of Row objects containing the row values, empty for write operations
columns	Array<string>	An array of strings with the names of the columns in the order they appear in each Row, empty for write operations
rowsAffected	number	The number of rows affected by a write statement, 0 otherwise
lastInsertRowid	bigint | undefined	The ID of a newly inserted row, or undefined if there is none for the statement
​
# Simple query
You can pass a string or object to execute() to invoke a SQL statement:


- String:

`const result = await client.execute("SELECT * FROM users");`

- Object:

```

const result = await client.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});

```

​
# Placeholders
libSQL supports the use of positional and named placeholders within SQL statements:


- Positional:

```

const result = await client.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});

const result = await client.batch(
  [
    {
      sql: "INSERT INTO users VALUES (?)",
      args: ["Iku"],
    },
  ],
  "write"
);

```

```

- Named:

const result = await client.execute({
  sql: "INSERT INTO users VALUES (:name)",
  args: { name: "Iku" },
});

const result = await client.batch(
  [
    {
      sql: "INSERT INTO users VALUES (:name)",
      args: { name: "Iku" },
    },
  ],
  "write"
);

```


*libSQL supports the same named placeholder characters as SQLite — :, @ and $.*

​
# Transaction Modes
Mode	| SQLite command	| Description
write |	BEGIN IMMEDIATE	| The transaction may execute statements that read and write data. Write transactions executed on a replica are forwarded to the primary instance, and can’t operate in parallel.
read |	BEGIN TRANSACTION READONLY |	The transaction may only execute statements that read data (select). Read transactions can occur on replicas, and can operate in parallel with other read transactions.
deferred | BEGIN DEFERRED	| The transaction starts in read mode, then changes to write as soon as a write statement is executed. This mode change may fail if there is a write transaction currently executing on the primary.
​
# Batch Transactions
A batch consists of multiple SQL statements executed sequentially within an implicit transaction. The backend handles the transaction: success commits all changes, while any failure results in a full rollback with no modifications.

```

const result = await client.batch(
  [
    {
      sql: "INSERT INTO users VALUES (?)",
      args: ["Iku"],
    },
    {
      sql: "INSERT INTO users VALUES (?)",
      args: ["Iku 2"],
    },
  ],
  "write"
);

```