import datetime

class USDX:
    def __init__(self):
        self.price = 1.0
        self.total_supply = 0
        self.user_balances = {}
        self.yield_rate = 0.03  # 3% annual yield for demonstration

    def mint(self, user, amount):
        tokens = amount / self.price
        self.total_supply += tokens
        self.user_balances[user] = self.user_balances.get(user, 0) + tokens
        return tokens

    def redeem(self, user, tokens):
        if self.user_balances.get(user, 0) < tokens:
            return 0
        amount = tokens * self.price
        self.total_supply -= tokens
        self.user_balances[user] -= tokens
        return amount

    def accrue_yield(self, days):
        daily_yield = self.yield_rate / 365
        self.price *= (1 + daily_yield) ** days

    def get_balance(self, user):
        return self.user_balances.get(user, 0)

# Simulation
usdx = USDX()

print("USDX Demonstration")
print("=================")

# Mint USDX
print("Minting $10,000 worth of USDX")
tokens = usdx.mint("Alice", 10000)
print(f"Alice received {tokens:.2f} USDX tokens")

# Check balance
print(f"Alice's balance: {usdx.get_balance('Alice'):.2f} USDX")

# Simulate yield accrual
print("\nSimulating 30 days of yield accrual")
usdx.accrue_yield(30)
print(f"New USDX price: ${usdx.price:.6f}")

# Check updated value
alice_value = usdx.get_balance("Alice") * usdx.price
print(f"Alice's USDX value after 30 days: ${alice_value:.2f}")

# Redeem half of the tokens
redeem_tokens = usdx.get_balance("Alice") / 2
redeemed_amount = usdx.redeem("Alice", redeem_tokens)
print(f"\nAlice redeems {redeem_tokens:.2f} USDX tokens")
print(f"Alice receives ${redeemed_amount:.2f}")

# Final balance check
final_balance = usdx.get_balance("Alice")
final_value = final_balance * usdx.price
print(f"\nAlice's final balance: {final_balance:.2f} USDX")
print(f"Alice's final USDX value: ${final_value:.2f}")