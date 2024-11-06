class USDX:
  def __init__(self):
      self.balance = 0.0       # Number of tokens held
      self.token_price = 100.0 # Initial token price in USD

  def mint(self, amount):
      self.balance += amount
      print(f"Minted {amount} USDX tokens at initial price ${self.token_price:.2f}.")
      print(f"Total balance: {self.balance:.2f} tokens.\n")

  def accrue_yield(self, yield_rate):
      self.token_price *= (1 + yield_rate)
      return self.token_price

# Demo
usdx = USDX()
usdx.mint(1)  # Mint initial tokens (e.g., 1 token at $100)

yield_rate = 0.0001  # Daily yield rate (0.01%)

# Header for the output table
print(f"{'Day':<5} {'Previous Price':<18} {'Yield Rate':<15} {'New Price':<15}")
print('-' * 65)

# Simulate yield over 10 days
for day in range(1, 11):
  prev_price = usdx.token_price
  new_price = usdx.accrue_yield(yield_rate)
  print(f"{day:<5} ${prev_price:<17.6f} {yield_rate:<15.6f} ${new_price:<14.6f}")

# Summary
total_value = usdx.balance * usdx.token_price
print(f"\nTotal value after {day} days: ${total_value:.6f}")
