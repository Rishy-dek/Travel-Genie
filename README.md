<p align="center">
  <a href="https://travel-genie--rishaannandan9.replit.app">
    <img src="https://replit.com/cdn-cgi/image/width=128,quality=80,format=auto/https://storage.googleapis.com/replit/images/1766866019980_547f64dbeca56e2966407975525ee9ce.png" alt="Travel-Genie Logo">
  </a>
</p>


 # <p align="center" style="color: #CB8362">✈️ Travel Genie</p>

<br>

  [![GitHub stars](https://img.shields.io/github/stars/Rishy-dek/Travel-Genie?style=for-the-badge&logo=github)](https://github.com/Rishy-dek/Travel-Genie)
  [![License](https://img.shields.io/github/license/Rishy-dek/Travel-Genie?style=for-the-badge)](https://github.com/Rishy-dek/Travel-Genie/blob/main/LICENSE)
  [![Last Commit](https://img.shields.io/github/last-commit/Rishy-dek/Travel-Genie?style=for-the-badge)](https://github.com/Rishy-dek/Travel-Genie/commits/main)
  [![Contributors](https://img.shields.io/github/contributors/Rishy-dek/Travel-Genie?style=for-the-badge)](https://github.com/Rishy-dek/Travel-Genie/graphs/contributors)
  [![Forks](https://img.shields.io/github/forks/Rishy-dek/Travel-Genie?style=for-the-badge&logo=github)](https://github.com/Rishy-dek/Travel-Genie/network)
  [![Downloads](https://img.shields.io/github/downloads/Rishy-dek/Travel-Genie/total?style=for-the-badge)](https://github.com/Rishy-dek/Travel-Genie/releases)
  [![Issues](https://img.shields.io/github/issues/Rishy-dek/Travel-Genie?style=for-the-badge&logo=github&color=red)](https://github.com/Rishy-dek/Travel-Genie/issues)



  [![Join Discord](https://img.shields.io/badge/Discord-Join%20Our%20Server-5865F2?logo=discord&style=for-the-badge)](https://discord.gg/ykUv4kfg)
  [![Join Feature-Demo](https://img.shields.io/badge/Discord-Join%20The%20Event%20For%20Feature&20Demo-5865F2?logo=discord&style=for-the-badge)](https://discord.gg/YMmGUhWC?event=1455650583217438792)
  [![Live Demo](https://img.shields.io/badge/Live-Demo-green?logo=live&style=for-the-badge)](https://travel-genie--rishaannandan9.replit.app)
  [![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)](https://github.com/Rishy-dek/Travel-Genie/releases)


---

## 🌟 Description

Travel-Genie is a web app that helps users plan trips effortlessly. Enter a destination and travel preferences, then get **personalized itineraries, suggestions, and travel details** — powered by modern web technologies and AI-assisted logic.

**Live Demo:** [travel-genie--rishaannandan9.replit.app](https://travel-genie--rishaannandan9.replit.app)

---

## 🧠 Features

> *Currently working on Sign-in, redirect links, sharing, and saving*

- ✅ **Chat Interface** – Real-time AI conversation with the user  
- ✅ **Hotel Search** – 10 AI-generated options sorted by price  
- ✅ **Search Results Carousel** – Horizontal scrolling through options  
- ✅ **Hotel Details Panel** – 4 tabs:  
  - Overview (price, amenities, description)  
  - Travel Time (flight/drive/transit hours)  
  - Food Recommendations (nearby restaurants with ratings)  
  - Activities (things to do nearby)  
- ✅ **Booking Integration** – Direct links to booking platforms  
- ✅ **Persistent Chat History** – Messages saved to PostgreSQL  
- ✅ **AI-Powered Recommendations** – GPT-5 generates realistic options  
- ✅ **Multi-Platform Search** – Simulates TripIt, Hopper, Kayak, Skyscanner, Airbnb, Vrbo, Booking.com, Hotels.com  

---

## 🛠 Built With

### Frontend
- **React** – UI Framework  
- **TypeScript** – Type-safe JavaScript  
- **Vite** – Build tool and dev server  
- **Tailwind CSS** – Utility-first styling  
- **shadcn/ui** – Reusable UI components  
- **Framer Motion** – Smooth animations  
- **TanStack React Query** – Data fetching and caching  
- **Wouter** – Lightweight routing  
- **Lucide React** – Icon library  

### Backend
- **Express.js** – Web server framework  
- **PostgreSQL** – Database (via Replit’s Neon-backed DB)  
- **Drizzle ORM** – Type-safe database queries  
- **TypeScript** – Type safety  
- **OpenAI API** – GPT-5 for AI responses  

### API Endpoints
- `GET /api/chat/history` – Retrieves full chat history  
- `POST /api/chat` – Sends user message, generates AI response & options  
- `POST /api/chat/details` – Fetches detailed info for selected hotels

---

## 🚀 Getting Started

These instructions help you run the project locally for development and testing.

### Prerequisites

Install the following before you begin:

```bash
# Install Node.js if needed
node -v

# Clone repository
git clone https://github.com/rishaannandan9/travel-genie.git

cd travel-genie
```

### Install Dependencies

```bash
npm install     
```

You can check the dependencies, devdependecies, and the optional dependencies in:

``` bash
package.json
```

### Run The App

```bash
npm start       # To install package-lock.json
```

Open you browser and go to:

``` bash
http://localhost:5000
```

This starts both the Express backend and Vite frontend on port 5000.

---

## ⚙️ Configuration

Add any API keys or environment variables:

```bash

# Example .env file
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_key
```

---

## 📌 Usage

**1.** Enter destination, travel dates, preferences, and additional info.

**2.** View the generated itinerary, map, and recommendations.
> *Comming Soon*

**3.** Select and save destination.

**4.** Read through restaurants, landmarks, and additional advisory planners.

---

## 🧪 Testing

**Currently:** No testing framework is installed. The npm scripts only include:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run check` - TypeScript type checking
- `npm run db:push` - Database migrations

To add tests, you'd need to install a framework like Jest, Vitest, or Cypress.

---

## 🛡️ License

This project is licensed under the MIT License.

### MIT LISCENCE

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
**Permissions**

✓ Commercial use

✓ Modification

✓ Distribution

✓ Private use  
**Limitations**

❌ Liability

❌ Warranty  
**Conditions**

ℹ️ License and copyright notice

See the

``` bash
LICENSE 
```

file for details.

---

## 🙌 Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request with improvements.

Check:

``` bash
CONTRIBUTERS.md
```

for more info.

---

## 📫 Contact

Created by: @Rishy-Dek

Email: <rishaan.nandan9@gmail.com>

Check:

``` bash
AUTHORS
```

for more info or check my bio in Github and Scratch:

Github: <https://github.com/Rishy-dek>

Scratch: <https://scratch.mit.edu/users/Rishy-dek/>

---

## ⭐ Acknowledgments

- Inspired by AI-assisted travel planning apps
- Thanks to open-source libraries and APIs used

**Special thanks** to Replit for its AI app helper for helping me create this app and it's built in workspace.

### Additional Workspaces

- VsCode
- Github Codespaces

Check:

``` bash
ACKNOWLEDGEMENTS
```

for more info.

> *This project contains documentation authored by Rishaan Nandan and source code generated by Replit Agent. The MIT License applies to the documentation; the code is provided as-is without claim of copyright.*
