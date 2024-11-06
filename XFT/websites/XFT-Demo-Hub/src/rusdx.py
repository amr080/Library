class rUSDX:
  def __init__(self):
      self.balance = 0.0

  def mint(self, amount):
      self.balance += amount
      print(f"Minted {amount} rUSDX tokens. Total balance: {self.balance:.2f} tokens.\n")

  def distribute_yield(self, yield_rate):
      yield_tokens = self.balance * yield_rate
      self.balance += yield_tokens
      return yield_tokens

# Demo
rusdx = rUSDX()
rusdx.mint(1000)  # Mint initial tokens

yield_rate = 0.0001  # Daily yield rate (0.01%)

# Header for the output table
print(f"{'Day':<5} {'Previous Balance':<18} {'Yield Tokens':<15} {'New Balance':<15}")
print('-' * 65)

# Simulate yield over 10 days
for day in range(1, 11):
  prev_balance = rusdx.balance
  yield_tokens = rusdx.distribute_yield(yield_rate)
  new_balance = rusdx.balance
  print(f"{day:<5} {prev_balance:<18.6f} {yield_tokens:<15.6f} {new_balance:<15.6f}")

# Summary
total_yield = rusdx.balance - 1000
print(f"\nTotal yield earned over {day} days: {total_yield:.6f} rUSDX tokens.")
