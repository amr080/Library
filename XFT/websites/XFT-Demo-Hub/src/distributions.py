class USDX:
    def __init__(self):
        self.balance = 0.0
        self.price = 100.0  # Initial token price in USD

    def mint(self, amount):
        self.balance += amount
        print(f"Minted {amount} USDX tokens at initial price ${self.price:.2f}.")
        print(f"Total USDX balance: {self.balance:.2f} tokens.\n")

    def accrue_yield(self, yield_rate):
        self.price *= (1 + yield_rate)

class rUSDX:
    def __init__(self):
        self.balance = 0.0
        self.price = 1.0  # Stable token price in USD

    def mint(self, amount):
        self.balance += amount
        print(f"Minted {amount} rUSDX tokens at initial price ${self.price:.2f}.")
        print(f"Total rUSDX balance: {self.balance:.2f} tokens.\n")

    def distribute_yield(self, yield_rate):
        yield_tokens = self.balance * yield_rate
        self.balance += yield_tokens

# Demo

# Initial investment of $100 in both USDX and rUSDX
# For USDX
usdx = USDX()
usdx.mint(1)  # 1 token at $100

# For rUSDX
rusdx = rUSDX()
rusdx.mint(100)  # 100 tokens at $1

# Apply a yield rate of 1% (0.01)
yield_rate = 0.01

# Header for the output table
print(f"{'Token':<6} {'Balance':<15} {'Token Price':<15} {'Total Value':<15}")
print('-' * 55)

# Before Yield Accrual
usdx_total_value = usdx.balance * usdx.price
rusdx_total_value = rusdx.balance * rusdx.price
print(f"{'USDX':<6} {usdx.balance:<15.2f} ${usdx.price:<14.2f} ${usdx_total_value:<14.2f}")
print(f"{'rUSDX':<6} {rusdx.balance:<15.2f} ${rusdx.price:<14.2f} ${rusdx_total_value:<14.2f}\n")

# Apply Yield
usdx.accrue_yield(yield_rate)
rusdx.distribute_yield(yield_rate)

# After Yield Accrual
usdx_total_value = usdx.balance * usdx.price
rusdx_total_value = rusdx.balance * rusdx.price

print("After applying 1% yield:\n")
print(f"{'Token':<6} {'Balance':<15} {'Token Price':<15} {'Total Value':<15}")
print('-' * 55)
print(f"{'USDX':<6} {usdx.balance:<15.2f} ${usdx.price:<14.2f} ${usdx_total_value:<14.2f}")
print(f"{'rUSDX':<6} {rusdx.balance:<15.2f} ${rusdx.price:<14.2f} ${rusdx_total_value:<14.2f}")
