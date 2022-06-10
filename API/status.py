import requests, time, sys, os
from colorama import *
init()

class Status:
    def __init__(self) -> None:
        self.frontendURL = ""
        self.backendURL = "http://localhost:4200/"
        self.apiURL = "http://localhost:4201/response"

        if sys.platform == "win32": os.system("cls")
        else: os.system("clear")

    def getStatusService(self, url: str) -> str:
        try:
            start = time.perf_counter()
            response = requests.get(url)
            end = time.perf_counter() - start

            if (response.status_code == 200):
                if (round(end, 2) >= 1):
                    return f"{Fore.YELLOW}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} {end:.2f}s"
                else:
                    return f"{Fore.GREEN}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} {end:.2f}s"
        except Exception:
            if (url == ""):
                return f"{Fore.RED}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} (No URL parser)"
            else:
                return f"{Fore.RED}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} (No response | {url.replace('https://', '').replace('http://', '')})"

    def authAPIStatus(self) -> str:
        headersList = {
            "Accept": "*/*",
            "User-Agent": "Kalium Testing API",
            "Content-Type": "application/x-www-form-urlencoded" 
        }
        data = "mail=testing@test.com&password=a"

        # Login:
        try:
            start = time.perf_counter()
            response = requests.request("POST", self.apiURL.replace("/response", "/api/v1/auth/loginUser"), data = data,  headers = headersList)
            end = time.perf_counter() - start

            if (response.status_code == 200):
                return f"{Fore.GREEN}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} {end:.2f}s"
            else:
                return f"{Fore.RED}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} (No Login)"
        except Exception:
            if (self.apiURL == ""):
                return f"{Fore.RED}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} (No URL parser)"
            else:
                return f"{Fore.RED}●{Fore.RESET} {Fore.MAGENTA}|{Fore.RESET} (No response | {self.apiURL.replace('https://', '').replace('http://', '')})"

    def getStatus(self) -> str:
        return (
            f"""
            {Fore.RED}● Error{Fore.RESET} | {Fore.YELLOW}● Warning{Fore.RESET} | {Fore.GREEN}● GOOD {Fore.RESET}

            Frontend: {self.getStatusService(self.frontendURL)}
            Backend: {self.getStatusService(self.backendURL)}
            API: {self.getStatusService(self.apiURL)}
            Auth Login User: {self.authAPIStatus()}
            """
        )        

"""
Run:
"""

if __name__ == "__main__":
    status = Status()
    print(status.getStatus())

