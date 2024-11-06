from decimal import Decimal, ROUND_HALF_UP

class FOBXXFund:
    def __init__(self):
        self.aum = Decimal('0')
        self.yield_rate = Decimal('0.03')  # 3% annual yield
        self.management_fee_rate = Decimal('0.0015')  # 0.15% annual fee
        self.total_management_fee = Decimal('0')

    def invest(self, amount):
        self.aum += amount

    def get_daily_yield(self):
        return self.aum * (self.yield_rate / Decimal('365'))

    def get_daily_management_fee(self):
        daily_fee = self.aum * (self.management_fee_rate / Decimal('365'))
        self.total_management_fee += daily_fee
        return daily_fee

class XFTFundManager:
    def __init__(self):
        self.cash = Decimal('0')
        self.invested_in_fobxx = Decimal('0')

    def receive_investment(self, amount):
        self.cash += amount

    def invest_in_fobxx(self, fobxx_fund):
        investment_amount = self.cash
        fobxx_fund.invest(investment_amount)
        self.invested_in_fobxx += investment_amount
        self.cash -= investment_amount

class USDXToken:
    def __init__(self):
        self.total_supply = Decimal('0')
        self.price = Decimal('1.0')
        self.user_balances = {}

    def mint(self, user, amount):
        tokens = amount / self.price
        self.total_supply += tokens
        self.user_balances[user] = self.user_balances.get(user, Decimal('0')) + tokens

    def daily_update(self, net_daily_yield):
        increment = (net_daily_yield / self.total_supply).quantize(Decimal('0.0000001'), rounding=ROUND_HALF_UP)
        self.price += increment

    def get_balance_value(self, user):
        return self.user_balances.get(user, Decimal('0')) * self.price

class rUSDXToken(USDXToken):
    def daily_update(self, net_daily_yield):
        rebase_ratio = 1 + (net_daily_yield / self.total_supply)
        for user in self.user_balances:
            self.user_balances[user] *= rebase_ratio
        self.total_supply *= rebase_ratio

# Initialize entities
fobxx_fund = FOBXXFund()
xft_manager = XFTFundManager()
usdx_token = USDXToken()
rusdx_token = rUSDXToken()

# Visa invests in USDX and rUSDX tokens
visa_investment = Decimal('1000000')
usdx_token.mint('Visa', visa_investment / 2)
rusdx_token.mint('Visa', visa_investment / 2)
xft_manager.receive_investment(visa_investment)

# XFT invests in FOBXX fund
xft_manager.invest_in_fobxx(fobxx_fund)

# Simulate 30 days
for day in range(30):
    daily_yield = fobxx_fund.get_daily_yield()
    daily_fee = fobxx_fund.get_daily_management_fee()
    net_daily_yield = daily_yield - daily_fee

    # Split net yield equally between USDX and rUSDX
    net_daily_yield_usdx = net_daily_yield / 2
    net_daily_yield_rusdx = net_daily_yield / 2

    usdx_token.daily_update(net_daily_yield_usdx)
    rusdx_token.daily_update(net_daily_yield_rusdx)

# Prepare output
visa_usdx_value = usdx_token.get_balance_value('Visa')
visa_rusdx_value = rusdx_token.get_balance_value('Visa')
visa_total_value = visa_usdx_value + visa_rusdx_value
visa_yield = visa_total_value - visa_investment

print("\n" + "="*50)
print("XFT USDX/rUSDX Token Demo")
print("="*50)

print("\nVisa Investment Flow:")
print(f"Initial Investment:           ${visa_investment:,.2f}")
print(f"  - Invested in USDX:         ${visa_investment/2:,.2f}")
print(f"  - Invested in rUSDX:        ${visa_investment/2:,.2f}")

print("\nXFT Fund Manager Actions:")
print(f"Received from Visa:           ${xft_manager.invested_in_fobxx:,.2f}")
print(f"Invested in FOBXX Fund:       ${xft_manager.invested_in_fobxx:,.2f}")

print("\nFOBXX Fund Metrics:")
print(f"Total AUM:                    ${fobxx_fund.aum:,.2f}")
print(f"Total Management Fee Revenue: ${fobxx_fund.total_management_fee:,.2f}")

print("\nVisa's 30-Day Returns:")
print(f"USDX Token Value:             ${visa_usdx_value:,.2f}")
print(f"rUSDX Token Value:            ${visa_rusdx_value:,.2f}")
print(f"Total Value:                  ${visa_total_value:,.2f}")
print(f"Total Yield Earned:           ${visa_yield:,.2f}")
print(f"Return on Investment:         {(visa_yield/visa_investment*100):,.4f}%")

print("\nToken Prices after 30 Days:")
print(f"USDX Token Price:             ${usdx_token.price:,.6f}")
print(f"rUSDX Token Price:            $1.000000 (fixed)")

print("\n" + "="*50)
