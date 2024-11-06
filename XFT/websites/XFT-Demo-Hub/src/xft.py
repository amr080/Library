import datetime
from decimal import Decimal, ROUND_HALF_UP

class PriceOracle:
    def __init__(self):
        self.price = Decimal('1.0')

    def update_price(self, new_price):
        self.price = Decimal(str(new_price)).quantize(Decimal('0.000001'), rounding=ROUND_HALF_UP)

    def get_price(self):
        return self.price

class USDXToken:
    def __init__(self, price_oracle):
        self.total_supply = Decimal('0')
        self.user_balances = {}
        self.price_oracle = price_oracle

    def mint(self, user, amount):
        tokens = amount / self.price_oracle.get_price()
        self.total_supply += tokens
        self.user_balances[user] = self.user_balances.get(user, Decimal('0')) + tokens
        return tokens

    def redeem(self, user, tokens):
        if self.user_balances.get(user, Decimal('0')) < tokens:
            return Decimal('0')
        amount = tokens * self.price_oracle.get_price()
        self.total_supply -= tokens
        self.user_balances[user] -= tokens
        return amount

    def get_balance(self, user):
        return self.user_balances.get(user, Decimal('0'))

class rUSDXToken:
    def __init__(self):
        self.total_supply = Decimal('0')
        self.user_balances = {}

    def mint(self, user, amount):
        tokens = amount
        self.total_supply += tokens
        self.user_balances[user] = self.user_balances.get(user, Decimal('0')) + tokens
        return tokens

    def redeem(self, user, tokens):
        if self.user_balances.get(user, Decimal('0')) < tokens:
            return Decimal('0')
        amount = tokens
        self.total_supply -= tokens
        self.user_balances[user] -= tokens
        return amount

    def rebase(self, yield_rate):
        rebase_factor = Decimal('1') + yield_rate
        for user in self.user_balances:
            self.user_balances[user] *= rebase_factor
        self.total_supply *= rebase_factor

    def get_balance(self, user):
        return self.user_balances.get(user, Decimal('0'))

class FOBXX:
    def __init__(self):
        self.aum = Decimal('0')
        self.yield_rate = Decimal('0.03')  # 3% annual yield

    def invest(self, amount):
        self.aum += amount

    def withdraw(self, amount):
        if amount <= self.aum:
            self.aum -= amount
            return amount
        return Decimal('0')

    def get_daily_yield(self):
        return self.aum * (self.yield_rate / Decimal('365'))

class USDXManager:
    def __init__(self, usdx_token, rusdx_token, price_oracle, fobxx):
        self.usdx_token = usdx_token
        self.rusdx_token = rusdx_token
        self.price_oracle = price_oracle
        self.fobxx = fobxx
        self.management_fee = Decimal('0.0015')  # 0.15% annual fee
        self.min_transaction = Decimal('5000')
        self.visa_idle_cash = Decimal('1000000')  # $1M idle Visa cash
        self.daily_liquid_assets = Decimal('0')

    def daily_update(self):
        # Invest idle Visa cash
        self.fobxx.invest(self.visa_idle_cash)

        # Calculate yield
        gross_yield = self.fobxx.get_daily_yield()
        net_yield = gross_yield - (self.fobxx.aum * (self.management_fee / Decimal('365')))

        # Update USDX price
        current_price = self.price_oracle.get_price()
        new_price = current_price * (Decimal('1') + (net_yield / self.fobxx.aum))
        self.price_oracle.update_price(new_price)

        # Rebase rUSDX
        rebase_factor = new_price / current_price
        self.rusdx_token.rebase(rebase_factor - Decimal('1'))

        # Update daily liquid assets
        self.daily_liquid_assets = self.fobxx.aum * Decimal('0.10')  # Assume 10% of AUM is liquid

    def mint(self, user, amount, token_type):
        if amount < self.min_transaction:
            raise ValueError(f"Minimum transaction amount is ${self.min_transaction}")

        self.fobxx.invest(amount)

        if token_type == 'USDX':
            return self.usdx_token.mint(user, amount)
        elif token_type == 'rUSDX':
            return self.rusdx_token.mint(user, amount)
        else:
            raise ValueError("Invalid token type")

    def redeem(self, user, tokens, token_type):
        if token_type == 'USDX':
            amount = self.usdx_token.redeem(user, tokens)
        elif token_type == 'rUSDX':
            amount = self.rusdx_token.redeem(user, tokens)
        else:
            raise ValueError("Invalid token type")

        if amount < self.min_transaction:
            raise ValueError(f"Minimum transaction amount is ${self.min_transaction}")

        self.fobxx.withdraw(amount)
        return amount

    def get_franklin_templeton_metrics(self):
        return {
            "AUM": self.fobxx.aum,
            "Daily Liquid Assets": self.daily_liquid_assets,
            "Management Fee Revenue": self.fobxx.aum * self.management_fee / Decimal('365')
        }

    def get_visa_metrics(self):
        return {
            "Yield on Idle Cash": self.visa_idle_cash * (self.fobxx.yield_rate - self.management_fee) / Decimal('365'),
            "Minimum Transaction": self.min_transaction,
            "24/7 Instant Mint/Redeem": "Enabled"
        }

# Simulation
price_oracle = PriceOracle()
usdx_token = USDXToken(price_oracle)
rusdx_token = rUSDXToken()
fobxx = FOBXX()
manager = USDXManager(usdx_token, rusdx_token, price_oracle, fobxx)

print("USDX and rUSDX Demonstration")
print("============================")

# Mint USDX and rUSDX
print("Minting $10,000 worth of USDX and rUSDX for Alice and Bob")
usdx_tokens = manager.mint("Alice", Decimal('10000'), 'USDX')
rusdx_tokens = manager.mint("Bob", Decimal('10000'), 'rUSDX')
print(f"Alice received {usdx_tokens:.6f} USDX tokens")
print(f"Bob received {rusdx_tokens:.6f} rUSDX tokens")

# Simulate 30 days
print("\nSimulating 30 days of yield accrual")
for _ in range(30):
    manager.daily_update()

print(f"New USDX price: ${price_oracle.get_price():.6f}")

# Check updated values
alice_value = usdx_token.get_balance("Alice") * price_oracle.get_price()
bob_value = rusdx_token.get_balance("Bob")
print(f"Alice's USDX value after 30 days: ${alice_value:.2f}")
print(f"Bob's rUSDX value after 30 days: ${bob_value:.2f}")

# Display Franklin Templeton and Visa metrics
ft_metrics = manager.get_franklin_templeton_metrics()
visa_metrics = manager.get_visa_metrics()

print("\nFranklin Templeton Metrics:")
for key, value in ft_metrics.items():
    print(f"{key}: ${value:.2f}")

print("\nVisa Metrics:")
for key, value in visa_metrics.items():
    print(f"{key}: {value}")

# Redeem half of the tokens
usdx_redeem = usdx_token.get_balance("Alice") / 2
rusdx_redeem = rusdx_token.get_balance("Bob") / 2
usdx_redeemed = manager.redeem("Alice", usdx_redeem, 'USDX')
rusdx_redeemed = manager.redeem("Bob", rusdx_redeem, 'rUSDX')
print(f"\nAlice redeems {usdx_redeem:.6f} USDX tokens and receives ${usdx_redeemed:.2f}")
print(f"Bob redeems {rusdx_redeem:.6f} rUSDX tokens and receives ${rusdx_redeemed:.2f}")

# Final balance check
alice_final_balance = usdx_token.get_balance("Alice")
alice_final_value = alice_final_balance * price_oracle.get_price()
bob_final_balance = rusdx_token.get_balance("Bob")
print(f"\nAlice's final balance: {alice_final_balance:.6f} USDX (${alice_final_value:.2f})")
print(f"Bob's final balance: {bob_final_balance:.6f} rUSDX (${bob_final_balance:.2f})")