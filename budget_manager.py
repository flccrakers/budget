import os
import sys
from datetime import datetime

from budget_utils import create_new_budget, compare_budget_categories, import_month, assign_categories


def show_menu():
    """
    Show the main menu and route user input to the appropriate functions.
    """
    while True:
        print("\n=== Budget Manager ===")
        print("1. Create new yearly budget file")
        print("2. Import monthly data")
        print("3. Assign category to month")
        print("4. Check missing")
        print("0. Exit")

        choice = input("Select an option: ")

        if choice == "1":
            year = input("Enter the year (e.g., 2025): ")
            if year.isdigit():
                create_new_budget(year)
            else:
                print("❌ Invalid year. Please enter a 4-digit number.")
        elif choice == "2":
            import_month()
            # print("🔧 Feature not yet implemented.")
        elif choice == "3":
            assign_categories()
        elif choice == "4":
            print("🔧 Check budget and ref def..")
            missing = compare_budget_categories()
            if len(missing) > 0:
                print("❗ Missing categories in ref:", missing)
            else:
                print("✅ All budget categories exist in ref.")
        elif choice == "0":
            print("👋 Exiting.")
            break
        else:
            print("❌ Invalid option. Please try again.")


if __name__ == "__main__":
    show_menu()
