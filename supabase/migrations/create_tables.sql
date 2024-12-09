-- Enable RLS (Row Level Security)
alter database postgres set timezone to 'UTC';

-- Create custom types
create type transaction_type as enum ('INCOME', 'EXPENSE');

-- Create users table (extends Clerk user)
create table users (
  id uuid primary key references auth.users on delete cascade,
  clerk_id text unique not null,
  email text unique not null,
  name text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type transaction_type not null,
  user_id uuid references users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(name, user_id)
);

-- Create tags table
create table tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  user_id uuid references users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(name, user_id)
);

-- Create transactions table
create table transactions (
  id uuid primary key default uuid_generate_v4(),
  type transaction_type not null,
  amount decimal(12,2) not null,
  date timestamp with time zone not null,
  notes text,
  user_id uuid references users(id) on delete cascade not null,
  category_id uuid references categories(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tags text[] DEFAULT '{}'
);

-- Create junction table for transactions and tags
create table transactions_tags (
  transaction_id uuid references transactions(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (transaction_id, tag_id)
);

-- Create indexes for better performance
create index idx_transactions_user_id on transactions(user_id);
create index idx_transactions_category_id on transactions(category_id);
create index idx_categories_user_id on categories(user_id);
create index idx_tags_user_id on tags(user_id);
create index idx_transactions_tags_transaction_id on transactions_tags(transaction_id);
create index idx_transactions_tags_tag_id on transactions_tags(tag_id);
create index idx_transactions_tags on transactions using gin(tags);

-- Enable Row Level Security
alter table users enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table transactions enable row level security;
alter table transactions_tags enable row level security;

-- Create RLS policies
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can insert their own data" on users
  for insert with check (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);

-- Similar policies for other tables
create policy "Users can view their own categories" on categories
  for select using (auth.uid() = user_id);

create policy "Users can manage their own categories" on categories
  for all using (auth.uid() = user_id);

create policy "Users can view their own transactions" on transactions
  for select using (auth.uid() = user_id);

create policy "Users can manage their own transactions" on transactions
  for all using (auth.uid() = user_id);

-- Add triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();

create trigger update_categories_updated_at
  before update on categories
  for each row
  execute function update_updated_at_column();

create trigger update_tags_updated_at
  before update on tags
  for each row
  execute function update_updated_at_column();

create trigger update_transactions_updated_at
  before update on transactions
  for each row
  execute function update_updated_at_column(); 