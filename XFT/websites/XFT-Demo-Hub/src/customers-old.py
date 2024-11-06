from decimal import Decimal, ROUND_HALF_UP

class FOBXX:
    def __init__(self):
        self.aum = Decimal('0')
        self.yield_rate = Decimal('0.03')  # 3% annual yield

    def invest(self, amount):
        self.aum += amount

    def get_daily_yield(self):
        return self.aum * (self.yield_rate / Decimal('365'))

class USDXToken:
    def __init__(self):
        self.total_supply = Decimal('0')
        self.price = Decimal('1.0')
        self.user_balances = {}

    def mint(self, user, amount):
        tokens = amount / self.price
        self.total_supply += tokens
        self.user_balances[user] = self.user_balances.get(user, Decimal('0')) + tokens

    def daily_update(self, daily_yield):
        self.price += (daily_yield / self.total_supply).quantize(Decimal('0.000001'), rounding=ROUND_HALF_UP)

    def get_balance_value(self, user):
        return self.user_balances.get(user, Decimal('0')) * self.price

# Initialize FOBXX and USDXToken
fobxx = FOBXX()
usdx = USDXToken()

# Visa invests idle cash
visa_idle_cash = Decimal('1000000')  # $1,000,000
fobxx.invest(visa_idle_cash)
usdx.mint('Visa', visa_idle_cash)

# Simulate 30 days of yield accrual
for day in range(30):
    daily_yield = fobxx.get_daily_yield()
    usdx.daily_update(daily_yield)

# Calculate Franklin Templeton's metrics
management_fee_rate = Decimal('0.0015')  # 0.15% annual fee
ft_fee_revenue = fobxx.aum * management_fee_rate / Decimal('365') * 30
daily_liquid_assets = fobxx.aum * Decimal('0.10')  # Assuming 10% in liquid assets

# Display Metrics
print("Franklin Templeton Metrics:")
print(f"AUM: ${fobxx.aum:.2f}")
print(f"Management Fee Revenue (30 days): ${ft_fee_revenue:.2f}")
print(f"Daily Liquid Assets: ${daily_liquid_assets:.2f}\n")

print("Visa Metrics:")
visa_balance_value = usdx.get_balance_value('Visa')
visa_yield = visa_balance_value - visa_idle_cash
print(f"Yield on Idle Cash (30 days): ${visa_yield:.2f}")
print(f"Final Investment Value: ${visa_balance_value:.2f}")
print("Minimum Transaction: $5,000")
print("24/7 Instant Mint/Redeem: Enabled")
