<h1>FolkSoul API</h1>
<p>Platform for musical band, where you can get information about the band and its members</p>
<p>Production URL: <a href="https://folksoul-api.giorgi-atanelashvili.redberryinternship.ge/api" target="_blank">https://folksoul-api.giorgi-atanelashvili.redberryinternship.ge/api</a></p>

<section>
<h2>Table of Contents</h2>
<ul>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href=#functionality>Functionality</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#resources">Resources</a></li>
</ul>
</section>

<section id="prerequisites">
    <h2>Prerequisites</h2>
    <ul>
        <li><img src="docs/assets/node.png" style="vertical-align:bottom;width:20px;"> NodeJS</li>
        <li><img src="docs/assets/npm.png" style="width:25px;"> npm</li>
    </ul>
</section>

<section id="tech-stack">
    <h2>Tech Stack</h2>
    <ul>
        <li><a href="https://expressjs.com/" target="_blank">ExpressJS @4.18.1</a> - Web framework for NodeJS</li>
        <li><a href="https://mongoosejs.com/" target="_blank">Mongoose @6.4.1</a> - MongoDB object modeling</li>
        <li><a href="https://mongoosejs.com/" target="_blank">Joi @17.6.0</a> - Object schema validator</li>
        <li><a href="https://www.npmjs.com/package/bcrypt" target="_blank">Bcrypt @5.0.1</a> - Library for hashing functions</li>
        <li><a href="https://www.npmjs.com/package/multer" target="_blank">Multer @1.4.5-lts.1</a> - Middleware for handling multipart/form-data
        <li><a href="https://www.npmjs.com/package/swagger-ui-express" target="_blank">Swagger-UI-express @4.5.0</a> - Module for serving auto-gen swagger-ui
        <li><a href="https://www.npmjs.com/package/cors" target="_blank">Cors @2.8.5</a> - Middleware for allowing CORS
        <li><a href="https://jwt.io/" target="_blank">JWT</a> - Open standard for securely transferring data</li>
    </ul>
</section>

<section id="getting-started">
    <h2>Getting Started</h2>
    <ol>
        <li>Clone Coronatime repository from GitHub:</li>
        <pre>git clone https://github.com/RedberryInternship/foulksoul-api-GioAtanelishvili.git</pre>
        <li>Create .env file:</li>
        <pre>cp .env.example .env</pre>
        <li>Replace example values with actual values in .env file.</li>
        <li>Install dependencies:</li>
        <pre>npm install/npm ci</pre>
        <li>Start running server:</li>
        <pre>npm run dev</pre>
    </ol>
</section>

<section id="functionality">
    <h2>Functionality</h2>
    <ul>
        <li>Admin
            <ul>
                <li>Create a admin (You can create a user by running <code>npm run create:admin</code> command)</li>
                <li>Login</li>
            </ul>
        </li>
        <li>Band members
            <ul>
                <li>Get a list of all band members</li>
                <li>Create/Edit/Delete a band member</li>
                <li>Add/Update band member's avatar</li>
            </ul>
        </li>
        <li>Social media
            <ul>
                <li>Create/Get/Edit/Delete a social media</li>
                <li>Add/Update social media icon</li>
            </ul>
        </li>
    </ul>
    For more detailed info, check <a href="https://folksoul-api.giorgi-atanelashvili.redberryinternship.ge/api-docs" target="_blank">API specification</a>
<section>

<section id="project-structure">
    <h2>Project Structure</h2>
    <pre>
.
├── docs                          # Readme resources
│   └── assets                      # Readme assets
├── src                           # Source files
│   ├── bin                         # Custom npm commands
│   │   └── create-admin.ts            # Admin creation command
│   ├── config                      # Config files
│   │   ├── mongo.ts                  # Connect to mongo     
│   │   └── swagger.yaml              # API docs
│   │   └── index.ts                  # Export mongo connect func
│   ├── controllers                 # Controllers
│   │   ├── controller-name.ts        # Controllers for 'name' route
│   │   └── index.ts                  # Export controllers
│   ├── middlewares                 # Middlewares
│   │   ├── middleware-name.ts        # Middleware
│   │   └── index.ts                  # Export middlewares
│   ├── models                      # MongoDB models
│   │   ├── Model.ts                  # MongoDB model
│   │   └── index.ts                  # Export models
│   ├── routes                      # Route handlers
│   │   └── api.ts                    # API routes
│   │   └── index.ts                  # Export router
│   ├── schemas                     # Validation schemas
│   │   ├── schema-name.ts            # Joi schema
│   │   └── index.ts                  # export schemas
│   ├── utils                       # Util functions
│   │   ├── utils-file.ts             # Related util funcs
│   │   └── index.ts                  # Export util funcs
│   └── server.ts                   # Entry file
- .env.example                    # Example file for .env
- .eslintignore                   # Eslint ignore
- .eslint.json                    # Eslint config
- .gitignore                      # Untracked files/folders
- .prettier.json                  # Prettier config
- babel.config.json               # Babel config
- package-lock.json               # Dependencies
- package.json                    # Dependencies
- README.md                       # Markdown file
- tsconfig.json                   # TypeScript config</pre>
</section>

<section id="resources">
    <h2>Resources</h2>
    <ul>
        <li><a href="https://folksoul-api.giorgi-atanelashvili.redberryinternship.ge/api-docs" target="_blank">API specification</a>
        <li>Application URL: <a href="https://folksoul-api.giorgi-atanelashvili.redberryinternship.ge/api" target="_blank">https://employee-companies-api.giorgi-atanelashvili.redberryinternship.ge/api</a></li>
    </ul>
</section>
