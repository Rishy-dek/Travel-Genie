<dev align = "center">

![https://replit.com/cdn-cgi/image/width=128,quality=80,format=auto/https://storage.googleapis.com/replit/images/1766866019980_547f64dbeca56e2966407975525ee9ce.png](https://replit.com/cdn-cgi/image/width=128,quality=80,format=auto/https://storage.googleapis.com/replit/images/1766866019980_547f64dbeca56e2966407975525ee9ce.png)

</dev>

<dev align = "center">

# <p style="color: #CB8362">✈️ Travel Genie</p>

</dev>



![GitHub stars](https://img.shields.io/github/stars/Rishy-dek/Travel-Genie)     ![Repository License](https://img.shields.io/github/license/Rishy-dek/Travel-Genie)          ![Repository's Last Commit](https://img.shields.io/github/last-commit/Rishy-dek/Travel-Genie) 

**Description**  
Travel-Genie is a web app that helps users plan trips effortlessly. Enter a destination and travel preferences, then get personalized itineraries, suggestions, and travel details — powered by modern web technologies and AI-assisted logic.

**Live Demo:** <https://travel-genie--rishaannandan9.replit.app>


---

## 🧠 Features

> *Working on Sign-in feature, redirect links, sharing, saving*

✅ **Chat Interface** - Real-time AI conversation with the user

✅ **Hotel Search** - 10 AI-generated options sorted by price

✅ **Search Results Carousel** - Horizontal scrolling through all options

✅ **Hotel Details Panel** - Comprehensive information with 4 tabs:

- Overview (price, amenities, description)
- Travel Time (flight/drive/transit hours)
- Food Recommendations (nearby restaurants with ratings)
- Activities (things to do nearby)

✅ **Booking Integration** - Direct links to booking platforms

✅ **Persistent Chat History** - All messages saved to PostgreSQL

✅ **AI-Powered Recommendations** - GPT-5 generates realistic options and details

✅ **Multi-Platform Search** - Simulates TripIt, Hopper, Kayak, Skyscanner, Airbnb, Vrbo, Booking.com, Hotels.com

---

## 🛠️ Built With

> *Tech Stack*

- **Frontend:**
  - **React** - UI Framework
  - **TypeScript** - Type-safe JavaScript
  - **Vite** - Build tool and dev server
  - **Tailwind CSS** - Utility-first styling
  - **shadcn/ui** - Reusable UI component library
  - **Framer Motion** - Smooth animations and transitions
  - **TanStack React Query** - Data fetching and caching
  - **Wouter** - Lightweight routing
  - **Lucide React** - Icon library
- **Backend:**
  - **Express.js** - Web server framework
  - **PostgreSQL** - Database(via Replit's built-in Neon-backed database)
  - **Drizzle ORM** - Type-safe database queries
  - **OpenAI API** - GPT-5 for AI responses(via Replit's AI Integrations)
  - **TypeScript** - Type safety
- **AI / APIs:**
  - **GET** `/api/chat/history`
    - Retrieves entire chat conversation history
    - Returns array of messages with results/options
  - **POST** `/api/chat`
    - Sends user message to AI
    - AI generates response + 10 hotel/rental options
    - Stores both user message and AI response in database
    - Returns JSON with MESSAGE and results array
  - **POST** `/api/chat/details`
    - Fetches comprehensive details for a selected hotel
    - Returns travel times, restaurant recommendations, activities, price breakdowns
    - Data is AI-generated based on hotel name and location

> *AI - OpenAI API*

- **Hosting / Deployment:** Replit

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

- npm run dev - Start development server
- npm run build - Build for production
- npm run start - Run production build
- npm run check - TypeScript type checking
- npm run db:push - Database migrations

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
