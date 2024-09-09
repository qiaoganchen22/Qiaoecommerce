create table products(
    p_id serial primary key,
    p_name varchar(500) not null,
    p_price numeric not null,
    p_description varchar(5000) not null,
    p_amount integer default 0 not null,
    p_image varchar(5000) not null
);

create table users(
    u_id serial primary key,
    u_username varchar(20) unique not null,
    u_firstname varchar(50) not null,
    u_lastname varchar(50) not null,
    u_password varchar(5000) not null,
    u_admin boolean default false,
    u_deleted boolean default false
);

create table reviews(
    r_id serial primary key,
    r_p_id integer references products(p_id) not null,
    r_u_id integer references users(u_id) not null,
    r_review varchar(5000) not null,
    r_deleted boolean default false,
    r_date timestamp default now(),
    r_edited boolean default false
);

create table rating(
    r_id serial primary key,
    r_u_id integer references users(u_id) not null,
    r_p_id integer references products(p_id) not null,
    r_deleted boolean default false,
    r_rating integer not null
);

create type status as enum ('cancel','complete');

create table orders(
    o_id serial primary key,
    o_u_id integer references users(u_id) not null,
    o_total numeric not null,
    o_date timestamp default now(),
    o_status status not null,
    o_card varchar(16) not null,
    o_address varchar(2000) not null
);

create table items(
    i_id serial primary key,
    i_o_id integer references orders(o_id) not null,
    i_p_id integer references products(p_id) not null,
    i_count integer not null
);

create table cart(
    c_id serial primary key,
    c_u_id integer references users(u_id) not null
);

create table cart_items(
    ci_id serial primary key,
    ci_c_id integer references cart(c_id) not null
    ci_p_id integer references products(p_id) not null,
    ci_count integer not null
);

create table messages(
    m_id serial primary key,
    m_date timestamp default now(),
    m_sender varchar(500) not null,
    m_message varchar(5000) not null,
    m_deleted boolean default false,
    m_seen boolean default false,
    m_title varchar(500) not null,
    m_u_id integer references users(u_id) not null
);

create table contact_me(
    c_id serial primary key,
    c_email varchar(500) not null,
    c_message varchar(5000) not null,
    c_date timestamp default now()
);