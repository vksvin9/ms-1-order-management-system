==================================================
Project Name: order-management-system
Goal:
Build a complete full-stack enterprise application using:
* React Frontend
* Spring Boot Microservices
* H2 Database
* JWT Security
* Config Server
* Eureka
* API Gateway
* Secrets Management
* Resilience4j
* Zipkin
* Prometheus
* Grafana
* Docker
* Kubernetes
* CI/CD
==================================================
PHASE 0: PROJECT SETUP & GIT
============================
Topics:
* Create Git repository
* Initialize root project structure
* Add README.md
* Define naming conventions
Modules:
* frontend-react
* common-lib
* all backend services (empty folders)
Testing:
* Project opens successfully in VS Code
* Git commit works
Outcome:
Repository and folder structure ready
==================================================
PHASE 1: FOUNDATION (COMMON LIBRARY)
====================================
Topics:
* Maven multi-module project
* Common response wrapper
* Global exception handling
* Validation
* AOP logging
* Utility classes
Modules:
* common-lib
Testing:
* Unit tests for ApiResponse and exception classes
* Validation errors return standard JSON
Outcome:
Reusable shared backend library
==================================================
PHASE 2: PRODUCT SERVICE
========================
Topics:
* CRUD APIs
* H2 Database
* JPA
* DTO mapping
* Validation
Modules:
* product-service
Testing:
* Create, update, delete, list products
* Verify records in H2 console
Outcome:
Working Product Service
==================================================
PHASE 3: INVENTORY SERVICE
==========================
Topics:
* Stock management
* Separate H2 database
Modules:
* inventory-service
Testing:
* Add stock
* Reserve stock
* Release stock
Outcome:
Working Inventory Service
==================================================
PHASE 4: ORDER SERVICE
======================
Topics:
* Order persistence
* Business logic
Modules:
* order-service
Testing:
* Create and retrieve orders
Outcome:
Working Order Service
==================================================
PHASE 5: CORE BACKEND INTEGRATION
=================================
Topics:
* OpenFeign or RestClient
* Service-to-service communication
Testing:
* Place order
* Inventory decreases
* Order saved
Outcome:
Product + Inventory + Order integrated
==================================================
PHASE 6: REACT PROJECT SETUP
============================
Topics:
* Vite + React + TypeScript
* Bootstrap
* Axios
* React Router
Modules:
* frontend-react
Testing:
* App runs on port 5173
* Navigation works
Outcome:
Frontend foundation ready
==================================================
PHASE 7: REACT PRODUCT MODULE
=============================
Topics:
* Product list
* Create/edit forms
* Delete confirmation
Testing:
* Perform full product CRUD from UI
Outcome:
Frontend connected to Product Service
==================================================
PHASE 8: REACT INVENTORY MODULE
===============================
Topics:
* Manage stock quantities
Testing:
* Update inventory from UI
Outcome:
Inventory UI completed
==================================================
PHASE 9: REACT ORDER MODULE
===========================
Topics:
* Place orders
* View order history
Testing:
* Create orders from UI
* Verify backend integration
Outcome:
Core full-stack workflow complete
==================================================
PHASE 10: DISCOVERY SERVER (EUREKA)
===================================
Topics:
* Service registration and discovery
Modules:
* discovery-server
Testing:
* All services visible in Eureka dashboard
Outcome:
No hardcoded URLs
==================================================
PHASE 11: API GATEWAY
=====================
Topics:
* Centralized routing
* CORS configuration
Modules:
* api-gateway
Testing:
* React calls Gateway instead of direct services
Outcome:
Single entry point for frontend
==================================================
PHASE 12: CONFIG SERVER + CONFIG REPOSITORY
===========================================
Topics:
* Centralized YAML configuration
Modules:
* config-server
* config-repo
Testing:
* Services load configuration from Config Server
Outcome:
Externalized configuration
Config Server Health
http://localhost:8888/actuator/health
Product Service Configuration
http://localhost:8888/product-service/default
Auth Service Configuration
http://localhost:8888/auth-service/default
==================================================
PHASE 13: SECRETS MANAGEMENT
============================
Topics:
* Environment variables
* Secret placeholders
Testing:
* JWT secret and credentials loaded from environment
Outcome:
Sensitive data removed from source code
==================================================
PHASE 14: AUTH SERVICE + JWT
============================
Topics:
* Register/login
* JWT token generation
* Protected routes
Modules:
* auth-service
Testing:
* Login returns token
* Protected APIs require token
* React stores token and sends Authorization header
Outcome:
Application secured end-to-end
==================================================
PHASE 15: REACT AUTH MODULE
===========================
Topics:
* Login page
* Register page
* Protected routes
* Logout
Testing:
* Unauthorized users redirected to login
* Authenticated users access dashboard
Outcome:
Secure frontend experience
==================================================
PHASE 16: NOTIFICATION SERVICE
==============================
Topics:
* Async notifications after order creation
Modules:
* notification-service
Testing:
* Order creation triggers notification logs
Outcome:
Event-driven processing added
==================================================
PHASE 17: RESILIENCE4J
======================
Topics:
* Circuit breaker
* Retry
* Timeout
* Fallback
Testing:
* Stop Inventory Service and verify graceful fallback
Outcome:
Fault tolerance implemented
==================================================
PHASE 18: ZIPKIN
================
Topics:
* Distributed tracing
Testing:
* Trace requests across services
Outcome:
Request flow visibility
Start Zipkin with Docker
docker run -d --name zipkin -p 9411:9411 openzipkin/zipkin
This command will:
Download the official OpenZipkin Docker image
 automatically (if not already present)
Start Zipkin in the background
Expose the UI on port 9411
Open the Zipkin UI
Zipkin UI - http://localhost:9411/zipkin/
Verify the Container
docker ps
You should see a container named zipkin.
Useful Docker Commands
Stop Zipkin
docker stop zipkin
Start Again
docker start zipkin
Remove Container
docker rm -f zipkin
==================================================
PHASE 19: PROMETHEUS + GRAFANA
==============================
Topics:
* Metrics collection
* Dashboards
Testing:
* View health, JVM, and custom metrics
Outcome:
Monitoring stack operational
docker run -d --name prometheus -p 9090:9090 -v "C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system\prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
Verify Prometheus
Prometheus UI - http://localhost:9090/query
docker restart prometheus
---
docker run -d --name grafana -p 3000:3000 grafana/grafana-oss
http://localhost:3000/login admin:admin
Connect Grafana to Prometheus
1. Open Grafana
Grafana UI
Login with:
Username: admin
Password: admin
Set a new password when prompted.
2. Add Prometheus as a Data Source
In Grafana:
Click Connections → Data sources.
Click Add data source.
Select Prometheus.
Set the URL to:
http://host.docker.internal:9090
Click Save & test.
Expected message:
Successfully queried the Prometheus API.
3. Import a Spring Boot Dashboard
Recommended Dashboard ID
4701
This is a widely used Spring Boot and Micrometer dashboard.
Import Steps
Click Dashboards → Import.
Enter dashboard ID 4701.
Click Load.
Select the Prometheus data source.
Click Import.
4. View Metrics
The dashboard will display metrics such as:
JVM heap and non-heap memory
CPU usage
Garbage collection
Thread counts
HTTP request throughput and latency
5. Select a Service
Use the dashboard variables to choose:
order-service
product-service
inventory-service
auth-service
6. Generate Activity
Create orders and perform CRUD operations in your application to populate metrics.
==================================================
PHASE 20: DOCKER
================
Topics:
* Dockerfile for each backend service
* Dockerfile for React + Nginx
Testing:
* Build and run containers individually
Outcome:
All components containerized
1) Config-server: 
	CREATE DOCKER NETWORK > CREATE DOCKERFILE > BUILD JAR > BUILD DOCKER-IMAGE > RUN IMAGE (CONTAINER)) > TEST
2) Other (Use MultiStage Docker file)
	CREATE DOCKER NETWORK > CREATE DOCKERFILE (COMBINED BUILD JAR & DOCKER-IMAGE) > BUILD DOCKER-IMAGE  > RUN IMAGE (CONTAINER)) > TEST
## STEP 1: CREATE DOCKER NETWORK
Create a shared Docker network so all containers can communicate using service names instead of IP addresses.
	### File: `docker/create-network.bat` bat
	@echo off
	docker network create order-network
	pause 
	### Alternative PowerShell Command 
	docker network create order-network 
	### Run 
	cd ms-1-order-management-system
	docker\create-network.bat 
	### Verify 
	docker network ls 
	You should see: text
	order-network 
# STEP 2: CREATE DOCKERFILE 
	## File: `ms-9-config-server/Dockerfile`
		FROM eclipse-temurin:21-jdk
		WORKDIR /app
		COPY target/*.jar app.jar
		EXPOSE 8888
		ENTRYPOINT ["java", "-jar", "app.jar"] 
# STEP 3: BUILD JA & DOCKER-IMAGE > RUN IMAGE (CONTAINER)
	## Build the Config Server JAR 
		###Build from root folder
			cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system
			mvn clean package -pl ms-9-config-server -am -DskipTests
				mvn                 → Maven command-line tool
				clean               → Delete previous build output (target/ folders)
				package             → Compile code and create JAR file
				-pl                 → Project List option (build only selected module)
				ms-9-config-server  → Module name to build
				-am                 → Also Make required dependent modules (e.g., common-lib)
				-DskipTests         → Skip executing tests during build
		####Build from service folder
			cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system\ms-9-config-server
			mvn clean package -DskipTests 
			This generates 
			ms-9-config-server\target\config-server-0.0.1-SNAPSHOT.jar
		###
			mvn spring-boot:run   → Run directly from source code
			mvn clean package     → Create executable Spring Boot JAR
			mvn clean install     → Create executable JAR and install to .m2
			docker build          → Package executable JAR into Docker image
	## Build Docker Image 
		cd ms-9-config-server
		docker build -t config-server:1.0 . 
			docker              → Docker CLI command
			build               → Create a Docker image from a Dockerfile
			-t                  → Assign a name and tag to the image
			config-server       → Image name
			1.0                 → Image tag/version
			config-server:1.0   → Full image reference (image:tag)
			.                   → Current directory as the build context
	## Run Container 
		docker run -d --name config-server --network order-network -p 8888:8888 config-server:1.0
			docker           → Docker CLI command
			run              → Create and start a new container
			-d               → Run in background (detached mode)
			--name           → Assign a custom container name
			config-server    → Container name
			--network        → Connect container to a Docker network
			order-network    → Docker network name
			-p               → Publish port mapping
			8888:8888        → Host port 8888 → Container port 8888
			config-server    → Docker image name
			1.0              → Image tag/version
			config-server:1.0 → Full image reference (image:tag)
	## Verify Container
		### Check Running Containers 
		docker ps 
		### View Logs 
		docker logs -f config-server 
		### Test Health Endpoint
		Open in browser 
		http://localhost:8888/actuator/health 
		Expected response: 
		{"status":"UP"}
		### Test Configuration Endpoint
		Open 
		http://localhost:8888/product-service/default 
	## Useful Commands
		### Stop Container 
		docker stop config-server 
		### Start Container 
		docker start config-server 
		### Remove Container 
		docker rm -f config-server 
		### Remove Image 
		docker rmi config-server:1.0 
	## Expected Outcome
		* Config Server starts inside Docker.
		* Exposed on port `8888`.
		* Accessible from host and other containers using:
		  * `http://localhost:8888`
		  * `http://config-server:8888`
	## Git Commit 
		git add ms-9-config-server/Dockerfile
		git commit -m "Phase 20 - Add Dockerfile for Config Server" 
#Build Singel Module
cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system
mvn clean package -pl ms-9-config-server -am -DskipTests
docker rm -f config-server
docker build --no-cache -t config-server:1.0 -f ms-9-config-server/Dockerfile .
docker run -d --name config-server --network order-network -p 8888:8888 config-server:1.0
***Separate building jar manually and docker image using Dokcerfile***
# 1. Create Docker network (run once)
	docker network create order-network
# 2. Build all required Spring Boot JARs
	mvn clean package -DskipTests
	# WAIT until Maven shows:
	# [INFO] BUILD SUCCESS
# 3. Remove existing containers
	docker rm -f config-server discovery-server product-service auth-service api-gateway frontend-react
# 4. Build Docker images
	docker build --no-cache -t config-server:1.0 -f ms-9-config-server/Dockerfile .
	docker build --no-cache -t discovery-server:1.0 ms-6-discovery-server
	docker build --no-cache -t auth-service:1.0 ms-8-auth-service
	docker build --no-cache -t product-service:1.0 ms-2-product-service
	docker build --no-cache -t api-gateway:1.0 ms-7-api-gateway
	docker build --no-cache -t frontend-react:1.0 ms-5-frontend-react
	# WAIT until each docker build ends with:
	# Successfully tagged <image-name>:1.0
# 5. Start Config Server
	docker run -d --name config-server --network order-network -p 8888:8888 config-server:1.0
	# WAIT 20-30 seconds
	# VERIFY: http://localhost:8888/actuator/health  => {"status":"UP"}
	#LOGS: docker logs -f config-server || docker logs config-server --tail 100
# 6. Start Discovery Server
	docker run -d --name discovery-server --network order-network -e CONFIG_SERVER_URL=http://config-server:8888 -e EUREKA_SERVER_URL=http://discovery-server:8761/eureka/ -p 8761:8761 discovery-server:1.0
	# WAIT 20-30 seconds
	# VERIFY: http://localhost:8761  opens successfully
	#LOGS: docker logs -f discovery-server || docker logs discovery-server --tail 100
# 7. Start Auth Service
	docker run -d --name auth-service --network order-network -e CONFIG_SERVER_URL=http://config-server:8888 -e EUREKA_SERVER_URL=http://discovery-server:8761/eureka/ -p 8084:8084 auth-service:1.0
	# WAIT 20-30 seconds
	# VERIFY in Eureka: AUTH-SERVICE status = UP
	#LOGS: docker logs -f auth-service || docker logs auth-service --tail 100
# 8. Start Product Service
	docker run -d --name product-service --network order-network -e CONFIG_SERVER_URL=http://config-server:8888 -e EUREKA_SERVER_URL=http://discovery-server:8761/eureka/ -p 8081:8081 product-service:1.0
	# WAIT 20-30 seconds
	# VERIFY in Eureka: PRODUCT-SERVICE status = UP
	#LOGS: docker logs -f product-service || docker logs product-service --tail 100
# 9. Start API Gateway
	docker run -d --name api-gateway --network order-network -e CONFIG_SERVER_URL=http://config-server:8888 -e EUREKA_SERVER_URL=http://discovery-server:8761/eureka/ -e FRONTEND_URL=http://localhost:5173 -p 8080:8080 api-gateway:1.0
	# WAIT 20-30 seconds
	# VERIFY: http://localhost:8080/actuator/health  => {"status":"UP"}
	#LOGS: docker logs -f api-gateway || docker logs api-gateway --tail 100
# 10. Start React Frontend
	docker run -d --name frontend-react --network order-network -p 5173:80 frontend-react:1.0
	# WAIT 5-10 seconds
	#LOGS: docker logs -f frontend-react || docker logs frontend-react --tail 100
# 11. Open Application
	# http://localhost:5173
# 12. If login fails due to old token, clear browser storage:
	# localStorage.clear();
	# sessionStorage.clear();
# 13. Verify Running Containers
	docker ps
# 14. Monitor Supporting Tools
	Zipkin
	http://localhost:9411
	Prometheus
	http://localhost:9090
	Grafana
	http://localhost:3000
7. Check Logs
	docker logs -f product-service --tail 100
	docker logs -f api-gateway
	docker logs -f frontend-react
	8. Full End-to-End Test
	1. Open http://localhost:5173
	2. Login as ADMIN
	3. Create a product
	4. Add inventory
	5. Place an order
	6. Verify dashboard metrics
	7. Check traces in Zipkin
	8. Check metrics in Grafana
	9. Container Health Check
	docker ps
	docker stats
------------------------------------------------------------------------------------------------------------------------
#MULTI STAGE DOCKER FILE
Yes. You can combine JAR building and Docker image creation into a single Docker build using a multi-stage Dockerfile.
	Why We Initially Built Them Separately
		mvn clean package   → Creates the JAR
		docker build       → Packages the JAR into an image
		This approach is simple and helps you understand each step.
	Better Approach: Multi-Stage Docker Build
		Docker can run Maven inside the build process:
		Copy source code
		Run mvn clean package
		Create the final lightweight image
		Copy only the generated JAR
	Then you only run:
		docker build -t config-server:1.0 .
##Multi-Stage Dockerfile for Config Server
	#File: ms-9-config-server/Dockerfile
	# Stage 1: Build the application
	FROM maven:3.9.11-eclipse-temurin-21 AS builder
	WORKDIR /build
	# Copy parent POM, common library, and this module
	COPY pom.xml .
	COPY ms-1-common-lib ms-1-common-lib
	COPY ms-9-config-server ms-9-config-server
	# Build only this module and its dependencies
	RUN mvn clean package -pl ms-9-config-server -am -DskipTests
	# Stage 2: Runtime image
	FROM eclipse-temurin:21-jre
	WORKDIR /app
	COPY --from=builder /build/ms-9-config-server/target/*.jar app.jar
	EXPOSE 8888
	ENTRYPOINT ["java", "-jar", "app.jar"]
	Build from Root Directory
	cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system
	docker build -t config-server:1.0 -f ms-9-config-server/Dockerfile .
	-f ms-9-config-server/Dockerfile → Use that Dockerfile
	. → Root folder is the build context so Docker can access all required modules
	Run Container
	docker run -d --name config-server --network order-network -p 8888:8888 config-server:1.0
	Advantages
	Single command      → docker build ...
	No local Maven build required
	Consistent builds   → Same process on any machine
	CI/CD friendly      → Ideal for pipelines
	Smaller final image → Only runtime JAR included
	Recommended Enterprise Practice
	Use multi-stage Dockerfiles for all services. This is the standard approach in modern Docker, CI/CD, and Kubernetes deployments.
	---
==================================================
PHASE 21: DOCKER COMPOSE (issue when (1)services starting be fore db is up & (2)services are up together and not wait for dependent servcies to up)
========================
Topics:
* Multi-container orchestration
Testing:
* Entire system starts with one command
Outcome:
Complete local container environment
Phase 21 – Build, Run, Test, and Git Commit
After creating:
.env
docker-compose.yml
#Phase 21 – Build, Run, Test, and Git Commit
	docker compose down -v
	docker rm -f zipkin prometheus grafana config-server discovery-server auth-service product-service inventory-service order-service notification-service api-gateway frontend-react
	docker compose up -d
1. Create Docker Network (Run Once)
	docker network create order-network
2. Build All Docker Images
	#Remove existing containers
	docker rm -f zipkin prometheus grafana config-server discovery-server auth-service product-service inventory-service order-service notification-service api-gateway frontend-react
	#Run from the project root:
	cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system
	mvn clean package -DskipTests
	docker build --no-cache -t config-server:1.0 -f ms-9-config-server/Dockerfile .
	docker build --no-cache -t discovery-server:1.0 ms-6-discovery-server
	docker build --no-cache -t auth-service:1.0 ms-8-auth-service
	docker build --no-cache -t product-service:1.0 ms-2-product-service
	docker build --no-cache -t inventory-service:1.0 ms-3-inventory-service
	docker build --no-cache -t order-service:1.0 ms-4-order-service
	docker build --no-cache -t notification-service:1.0 ms-10-notification-service
	docker build --no-cache -t api-gateway:1.0 ms-7-api-gateway
	docker build --no-cache -t frontend-react:1.0 ms-5-frontend-react
3. Start the Entire Environment
	docker compose up -d
4. Verify Container Status
	docker compose ps
	Expected:
	config-server → healthy
	discovery-server → healthy
	All other services → running
5. Monitor Startup Logs
	docker compose logs -f
	Specific service logs:
	docker compose logs -f config-server
	docker compose logs -f discovery-server
	docker compose logs -f product-service
	docker compose logs -f api-gateway
6. Verify URLs
	Component	URL
	Frontend	http://localhost:5173
	API Gateway	http://localhost:8080/actuator/health
	Eureka Dashboard	http://localhost:8761
	Config Server	http://localhost:8888/actuator/health
	Zipkin	http://localhost:9411
	Prometheus	http://localhost:9090
	Grafana	http://localhost:3000
	Grafana login:
	Username: admin
	Password: admin
7. End-to-End Functional Test
	Open http://localhost:5173
	Register or login
	Create a product
	Update inventory
	Place an order
	Confirm notification logs
	Verify traces in Zipkin
	Verify metrics in Prometheus
	Import dashboard 4701 in Grafana
8. Stop Environment
	docker compose down
9. Restart Environment
	docker compose up -d
10. Remove Containers and Volumes
	docker compose down -v
11. Git Commit
	git add config-repo/*.yml .env docker-compose.yml
	git commit -m "Phase 21 - Add Docker Compose orchestration with health checks"
	Expected Outcome
	A single command:
	docker compose up -d
	will:
	Start Zipkin, Prometheus, and Grafana
	Start Config Server and wait until healthy
	Start Discovery Server and wait until healthy
	Start Auth, Product, Inventory, Order, and Notification services
	Start API Gateway
	Start React Frontend
	All services use persistent H2 file databases stored in Docker volumes.
Phase 21 Completed
	You have now implemented:
	Multi-container orchestration
	Ordered startup with health checks
	Persistent H2 storage
	Centralized environment configuration
	One-command startup and shutdown
==================================================
PHASE 22: KUBERNETES
====================
Topics:
* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
Testing:
* Full application runs on Minikube or kind
Outcome:
Production-style orchestration
---
Objective
	Deploy the complete order-management-system to Kubernetes using:
	Deployments
	Services
	ConfigMaps
	Secrets
	Ingress
	Outcome
	A production-style environment running on:
	Minikube or
	kind
Architecture in Kubernetes
	Ingress
	   ↓
	Frontend Service
	   ↓
	API Gateway Service
	   ↓
	-------------------------------------------------
	| Auth | Product | Inventory | Order | Notification |
	-------------------------------------------------
	   ↓
	Config Server
	   ↓
	Discovery Server
Prerequisites
	Before starting Phase 22, ensure:
	Phase 20 (Docker) completed
	Phase 21 (Docker Compose) completed and working
	Docker images built locally
	Docker Desktop running
	Recommended Local Kubernetes Platform
	Use Minikube (Recommended)
Minikube
	Why:
	Simplest for learning
	Includes ingress support
	Excellent for Spring Boot microservices
Installation Commands (Windows PowerShell)
	#Minikube - Creates a local Kubernetes cluster
	winget install Kubernetes.minikube
	#kubectl - Manages and deploys to the cluster
	winget install Kubernetes.kubectl
	Verify:
		minikube version
		kubectl version --client
Start Cluster
	minikube start --driver=docker --cpus=2 --memory=3000
		minikube   → Command-line tool used to create and manage a local Kubernetes cluster.
		start      → Creates and starts a Kubernetes cluster if it does not already exist.
		--driver   → Specifies which virtualization/container technology Minikube should use.
		docker     → Uses Docker Desktop containers as the infrastructure for the cluster.
		--cpus     → Allocates a specific number of CPU cores to the Minikube cluster.
		4          → Assigns 4 CPU cores to the Kubernetes cluster.
		--memory   → Allocates a specific amount of RAM to the Minikube cluster.
		8192       → Assigns 8192 MB (8 GB) of memory to the Kubernetes cluster.
	Verify: 
		kubectl get nodes
			kubectl → Kubernetes command-line tool used to communicate with a Kubernetes cluster.
			get     → Retrieves and displays Kubernetes resources.
			nodes   → Refers to the machines (virtual or physical) that run the Kubernetes cluster.
	Expected:
		minikube   Ready
Enable Ingress Controller
	The NGINX Ingress Controller acts as a reverse proxy inside Kubernetes and routes external traffic to your services.
	Example flow: Browser → Ingress → frontend-react-service → API Gateway → Microservices
	minikube addons enable ingress
		→ Installs and starts the NGINX Ingress Controller so external HTTP/HTTPS requests can be routed to your Kubernetes services using Ingress resources.
		minikube → Command-line tool used to manage a local Kubernetes cluster.
		addons   → Built-in optional components that can be installed into the Minikube cluster.
		enable   → Installs and activates the specified addon.
		ingress  → The NGINX Ingress Controller addon that routes external HTTP/HTTPS traffic to Kubernetes Services.
	Verify:
		kubectl get pods -n ingress-nginx
			kubectl → Kubernetes command-line tool used to communicate with the cluster.
			get → Retrieves and displays Kubernetes resources.
			pods → Shows the running containers grouped as Pods.
			-n → Specifies the Kubernetes namespace to query.
			ingress-nginx → The namespace where the NGINX Ingress Controller components are installed.
Kubernetes Folder Structure
	Create the following directory in the project root:
	k8s/
	├── namespace.yml
	├── configmap.yml
	├── secret.yml
	├── config-server/
	├── discovery-server/
	├── auth-service/
	├── product-service/
	├── inventory-service/
	├── order-service/
	├── notification-service/
	├── api-gateway/
	├── frontend-react/
	└── ingress.yml
	Create Kubernetes Directory Structure
		mkdir k8s
		mkdir k8s\config-server
		mkdir k8s\discovery-server
		mkdir k8s\auth-service
		mkdir k8s\product-service
		mkdir k8s\inventory-service
		mkdir k8s\order-service
		mkdir k8s\notification-service
		mkdir k8s\api-gateway
		mkdir k8s\frontend-react
		New-Item -ItemType File k8s\namespace.yml
		New-Item -ItemType File k8s\configmap.yml
		New-Item -ItemType File k8s\secret.yml
		New-Item -ItemType File k8s\ingress.yml
		Verify Structure
		tree k8s /F
	k8s/                    → Root folder containing all Kubernetes manifests.
	namespace.yml           → Creates a dedicated Kubernetes namespace.
	configmap.yml           → Stores non-sensitive environment variables.
	secret.yml              → Stores sensitive values such as JWT secrets.
	config-server/          → Deployment and Service manifests for Config Server.
	discovery-server/       → Deployment and Service manifests for Eureka.
	auth-service/           → Deployment and Service manifests for Auth Service.
	product-service/        → Deployment and Service manifests for Product Service.
	inventory-service/      → Deployment and Service manifests for Inventory Service.
	order-service/          → Deployment and Service manifests for Order Service.
	notification-service/   → Deployment and Service manifests for Notification Service.
	api-gateway/            → Deployment and Service manifests for API Gateway.
	frontend-react/         → Deployment and Service manifests for React Frontend.
	ingress.yml             → Routes external traffic into the cluster.
Phase 22 Implementation Order - Recommended sequence for Kubernetes deployment.
	Namespace         → Creates an isolated workspace in Kubernetes so all project resources are grouped together and separated from other applications.
	ConfigMap         → Stores non-sensitive configuration values so environment variables can be managed centrally without changing code.
	Secret            → Stores sensitive values such as JWT secrets and passwords securely instead of hardcoding them.
	Config Server     → Runs first because all microservices fetch their configuration from this service at startup.
	Discovery Server  → Runs after Config Server and provides service registration and discovery for all microservices.
	Backend Services  → Core business microservices (Auth, Product, Inventory, Order, Notification) that implement application functionality.
	API Gateway       → Provides a single entry point that routes external requests to the appropriate backend service.
	Frontend          → Hosts the React user interface that users access in the browser.
	Deployment        → Ensures the required number of Pods are created and automatically restarted if they fail.
	Service           → Provides a stable DNS name and IP address to access Pods inside the cluster.
	Ingress           → Acts as an HTTP/HTTPS reverse proxy to expose Services outside the cluster.
	Readiness Probe   → Prevents traffic from reaching a Pod until the application is fully started and healthy.
	Persistent Volume → Provides durable storage so data survives Pod restarts.
Build Images Before Deployment
	mvn clean package -DskipTests
	docker build --no-cache -t config-server:1.0 -f ms-9-config-server/Dockerfile .
	docker build --no-cache -t discovery-server:1.0 ms-6-discovery-server
	docker build --no-cache -t auth-service:1.0 ms-8-auth-service
Load All Images - Copies a Docker image into Minikube's internal image store.
	minikube image load config-server:1.0
	minikube image load discovery-server:1.0
	minikube image load auth-service:1.0
1)File: k8s/namespace.yml
	Apply the Namespace
		kubectl apply -f k8s/namespace.yml
		Verify Namespace
			kubectl get namespaces
		Expected output includes:
			order-management
	Why Use a Namespace?
		A namespace groups all resources for this project so they are isolated from other Kubernetes workloads.
	Example:
		Pods
		Services
		ConfigMaps
		Secrets
		Ingress
	All will be created inside:
		order-management
	Use the Namespace by Default
		kubectl config set-context --current --namespace=order-management
		Verify:
			kubectl config view --minify --output 'jsonpath={..namespace}'
		Expected:
			order-management
2)File: k8s/configmap.yml & File: k8s/secret.yml
	Apply Both Files
		kubectl apply -f k8s/configmap.yml
		kubectl apply -f k8s/secret.yml
		Verify Resources
			kubectl get configmap
			kubectl get secret
		Expected output includes:
			order-management-config
			order-management-secret
3)File: k8s/config-server/deployment.yml & File: k8s/config-server/service.yml
	Why We Create deployment.yml and service.yml
		For every microservice in Kubernetes, two core files are typically required:
		Deployment → Defines how the application should run - Runs and manages the application Pods.
		Service → Defines how other applications can access it - Provides a permanent internal network address to access those Pods.
	1. Deployment – Runs the Application
		What It Means
			A Deployment is a Kubernetes resource that tells the cluster:
			Which Docker image to run
			How many instances (Pods) to maintain
			Which ports the container exposes
			Which environment variables to inject
			How to check application health
			When to restart the application
		Example
			image: discovery-server:1.0
			replicas: 1
			Meaning:
			Run the discovery-server:1.0 image
			Keep exactly one instance running at all times
		Why We Use It
			Without a Deployment, Kubernetes does not know what application to run.
	2. Service – Creates a Stable Network Address
		What It Means
			A Service gives Pods a permanent internal DNS name and IP address.
			Pods are temporary and their IP addresses change whenever they restart.
		Example
			metadata:
			  name: discovery-server
		This creates a stable internal hostname:
			http://discovery-server:8761
		Why We Use It
			Other services can reliably call:
			http://config-server:8888
			http://discovery-server:8761
			http://inventory-service:8082
			even if Pod IP addresses change.
		Real-World Analogy
			Kubernetes Resource		Analogy
			Deployment				Factory manager that ensures workers are always present
			Pod						Individual worker
			Service					Reception desk with a permanent phone number
		Discovery Server Example Flow
			deployment.yml
				↓
			Kubernetes creates Pod
				↓
			Pod runs discovery-server:1.0
				↓
			service.yml
				↓
			Creates DNS name: discovery-server
				↓
			Other services call http://discovery-server:8761
		End-to-End Flow
			Docker Image
				↓
			Deployment
				↓
			Pod
				↓
			Service
				↓
			Stable DNS Name
				↓
			Other Services Communicate
		What Happens When You Apply the Files
			Deployment
				kubectl apply -f deployment.yml
			Kubernetes:
				Reads the Deployment
				Creates a ReplicaSet
				Creates a Pod
				Starts the container
				Monitors health
				Restarts if necessary
				Service
				kubectl apply -f service.yml
				Kubernetes:
				Creates a stable virtual IP
				Creates internal DNS
				Routes traffic to matching Pods
		Service
			kubectl apply -f service.yml
		Kubernetes:
			Creates a stable virtual IP
			Creates internal DNS
			Routes traffic to matching Pods
	*Apply Config Server
		kubectl apply -f k8s/config-server/deployment.yml
		kubectl apply -f k8s/config-server/service.yml
		Verify Deployment
			kubectl get pods
			kubectl get svc
		Expected:
			Pod config-server-* in Running state
			Service config-server
		Check Logs
			kubectl logs -f deployment/config-server
			kubectl describe pod config-server-74898777b4-lddmz
	Test Health Endpoint
		kubectl port-forward service/config-server 8888:8888
	Open:
		http://localhost:8888/actuator/health
		Expected response:
			{"status":"UP"}
4)File: k8s/discovery-server/deployment.yml & File: k8s/discovery-server/service.yml
	Load Discovery Server Image into Minikube
		minikube image load discovery-server:1.0 → Copies the Discovery Server Docker image into Minikube.
	Apply the Manifests
		kubectl apply -f k8s/discovery-server/deployment.yml          → Creates or updates the Discovery Server Deployment.
		kubectl apply -f k8s/discovery-server/service.yml             → Creates or updates the Discovery Server Service.
	Verify Deployment
		kubectl get pods                         → Shows the running Pods.
		kubectl get svc                          → Shows the Services.
		kubectl logs -f deployment/discovery-server → Streams Discovery Server logs.
	Expected:
		discovery-server-* pod becomes 1/1 Running
		discovery-server service is created
		Eureka starts successfully and registers with no errors
	Test Eureka Dashboard (Optional)
		kubectl port-forward service/discovery-server 8761:8761  → Exposes the internal Service on your local machine.
		Open:
			http://localhost:8761
5))File:
	# Create Auth Service files
	New-Item -ItemType File k8s\auth-service\deployment.yml
	New-Item -ItemType File k8s\auth-service\service.yml
	# Create Product Service files
	New-Item -ItemType File k8s\product-service\deployment.yml
	New-Item -ItemType File k8s\product-service\service.yml
	# Create Inventory Service files
	New-Item -ItemType File k8s\inventory-service\deployment.yml
	New-Item -ItemType File k8s\inventory-service\service.yml
	# Create Order Service files
	New-Item -ItemType File k8s\order-service\deployment.yml
	New-Item -ItemType File k8s\order-service\service.yml
	# Create Notification Service files
	New-Item -ItemType File k8s\notification-service\deployment.yml
	New-Item -ItemType File k8s\notification-service\service.yml
	# Create Api-Gateway Service files
	New-Item -ItemType File k8s\api-gateway\deployment.yml
	New-Item -ItemType File k8s\api-gateway\service.yml
	#Create Frontend Files
	New-Item -ItemType File k8s\frontend-react\deployment.yml
	New-Item -ItemType File k8s\frontend-react\service.yml
##Build Images Before Deployment
	docker build --no-cache -t product-service:1.0 ms-2-product-service
	docker build --no-cache -t inventory-service:1.0 ms-3-inventory-service
	docker build --no-cache -t order-service:1.0 ms-4-order-service
	docker build --no-cache -t notification-service:1.0 ms-10-notification-service
	docker build --no-cache -t api-gateway:1.0 ms-7-api-gateway
	docker build --no-cache -t frontend-react:1.0 ms-5-frontend-react
##Load Image and Deploy
	# Config Server
	minikube image load config-server:1.0
	kubectl apply -f k8s/config-server/deployment.yml
	kubectl apply -f k8s/config-server/service.yml
	# Discovery Server
	minikube image load discovery-server:1.0
	kubectl apply -f k8s/discovery-server/deployment.yml
	kubectl apply -f k8s/discovery-server/service.yml
	# Auth Service
	minikube image load auth-service:1.0
	kubectl apply -f k8s/auth-service/deployment.yml
	kubectl apply -f k8s/auth-service/service.yml
	# Product Service
	minikube image load product-service:1.0
	kubectl apply -f k8s/product-service/deployment.yml
	kubectl apply -f k8s/product-service/service.yml
	# Inventory Service
	minikube image load inventory-service:1.0
	kubectl apply -f k8s/inventory-service/deployment.yml
	kubectl apply -f k8s/inventory-service/service.yml
	# Order Service
	minikube image load order-service:1.0
	kubectl apply -f k8s/order-service/deployment.yml
	kubectl apply -f k8s/order-service/service.yml
	# Notification Service
	minikube image load notification-service:1.0
	kubectl apply -f k8s/notification-service/deployment.yml
	kubectl apply -f k8s/notification-service/service.yml
	# API Gateway
	minikube image load api-gateway:1.0
	kubectl apply -f k8s/api-gateway/deployment.yml
	kubectl apply -f k8s/api-gateway/service.yml
	# Frontend
	minikube image load frontend-react:1.0
	kubectl apply -f k8s/frontend-react/deployment.yml
	kubectl apply -f k8s/frontend-react/service.yml
##Recommended Approach - You can load all images first, then apply all manifests.
	#Load All Images
	minikube image load config-server:1.0
	minikube image load discovery-server:1.0
	minikube image load auth-service:1.0
	minikube image load product-service:1.0
	minikube image load inventory-service:1.0
	minikube image load order-service:1.0
	minikube image load notification-service:1.0
	minikube image load api-gateway:1.0
	minikube image load frontend-react:1.0
	#List All Images in Minikube
	minikube image ls
	#Check a Specific Image
	minikube image ls | Select-String "config-server"
	Recommended Way to Verify All Required Images
	minikube image ls | Select-String "config-server|discovery-server|auth-service|product-service|inventory-service|order-service|notification-service|api-gateway|frontend-react"
	#Apply All Manifests - will create conflict if congifg server not fully  up
	kubectl apply -f k8s/
	#Option 2 (Sequential for Learning and Troubleshooting)
	kubectl config set-context --current --namespace=order-management
	kubectl apply -f k8s/config-server/
	kubectl wait --for=condition=available deployment/config-server --timeout=300s
	kubectl apply -f k8s/discovery-server/
	kubectl wait --for=condition=available deployment/discovery-server --timeout=300s
	kubectl apply -f k8s/auth-service/
	kubectl apply -f k8s/product-service/
	kubectl apply -f k8s/inventory-service/
	kubectl apply -f k8s/order-service/
	kubectl apply -f k8s/notification-service/
	kubectl apply -f k8s/api-gateway/
	kubectl apply -f k8s/frontend-react/
	kubectl apply -f k8s/ingress.yml
	#Apply the Ingress
	kubectl apply -f k8s/ingress.yml
	#Verify the Ingress
	kubectl get ingress -n order-management
	#Get Minikube IP
	minikube ip
		Example output:
		192.168.49.2
	#Update Windows Hosts File
		Edit:
		C:\Windows\System32\drivers\etc\hosts
		Add:
		192.168.49.2 order-management.local
		Use the IP returned by minikube ip.
	#Open the Application
		http://order-management.local
		API requests will automatically route through:
		http://order-management.local/api
	#Verify All Resources
		kubectl get pods -n order-management
		kubectl get svc -n order-management
		kubectl get ingress -n order-management
#You can temporarily scale down or remove the less critical services and keep only the minimum set required for login and basic product management.
	Option 1 (Recommended): Scale Down Existing Deployments
		kubectl scale deployment inventory-service --replicas=0 -n order-management
		kubectl scale deployment order-service --replicas=0 -n order-management
		kubectl scale deployment notification-service --replicas=0 -n order-management
		Scaling to zero is preferable because you can restore them instantly.
		#Restore Later
		kubectl scale deployment inventory-service --replicas=1 -n order-management
		kubectl scale deployment order-service --replicas=1 -n order-management
		kubectl scale deployment notification-service --replicas=1 -n order-management
	Option 2: Delete the Deployments
		kubectl delete deployment inventory-service -n order-management
		kubectl delete deployment order-service -n order-management
		kubectl delete deployment notification-service -n order-management
	Verify Remaining Pods
		kubectl get pods -n order-management
	Expected active pods:
		config-server
		discovery-server
		auth-service
		product-service
		api-gateway
		frontend-react
	# 1. Verify Minikube is running
	minikube status
	# 2. Verify Ingress addon is enabled
	minikube addons list | findstr ingress
	# 3. Start tunnel in a separate Administrator PowerShell (must remain running)
	minikube tunnel
	# 4. Verify host resolves correctly
	ping order-management.local
	# 5. Check Ingress
	kubectl get ingress -n order-management
	# 6. Check Services
	kubectl get svc -n order-management
	# 7. Check Pods
	kubectl get pods -n order-management
	# 8. Restart ingress controller if needed
	kubectl rollout restart deployment ingress-nginx-controller -n ingress-nginx
	# 9. Wait until ingress controller is ready
	kubectl get pods -n ingress-nginx -w
	# 10. Restart application deployments
	kubectl rollout restart deployment frontend-react -n order-management
	kubectl rollout restart deployment api-gateway -n order-management
	kubectl rollout restart deployment auth-service -n order-management
	# 11. Verify LoadBalancer external IP
	kubectl get svc -n ingress-nginx
	# 12. Test from terminal
	curl http://order-management.local
	# 13. Flush DNS cache
	ipconfig /flushdns
==================================================
PHASE 23: CI/CD
===============
Topics:
* Build, test, Docker image creation
* Kubernetes deployment
Tools:
* GitHub Actions or Jenkins
Outcome:
Automated pipeline
==================================================
PHASE 24: PRODUCTION HARDENING
==============================
Topics:
* Profiles
* Health probes
* Resource limits
* Security best practices
Outcome:
Production-ready application
==================================================
Continuation Snapshot for Next Chat
==========================
Project: order-management-system
Tech Stack
- Java 21
- Spring Boot 3.4.7
- Spring Cloud 2024.0.2
- Maven Multi-Module
- React + Vite + TypeScript + Bootstrap
- H2 File Database
- Eureka Discovery Server
- Spring Cloud Gateway
- JWT Authentication
Package Convention
- com.vin
- com.vin.config
- com.vin.controller
- com.vin.service
- com.vin.repository
- com.vin.client
- com.vin.filter
- com.vin.util
User Preferences
- Use application.yml
- Provide complete code directly in chat
- Do not use canvas
- For each phase include:
  - Root pom.xml module entry (if needed)
  - Module pom.xml
  - application.yml
  - All required files
  - Build/run/test commands
Completed Modules
- ms-1-common-lib
- ms-2-product-service
- ms-3-inventory-service
- ms-4-order-service
- ms-5-frontend-react
- ms-6-discovery-server
- ms-7-api-gateway
- ms-8-auth-service
Completed Features
- Product CRUD
- Inventory management
- Order management
- React UI for Products, Inventory, Orders
- Eureka service discovery
- API Gateway routing
- JWT authentication
- Protected gateway routes
- React login/register
- Protected React routes
- Role-based UI (ADMIN/USER)
- Dashboard analytics
Correct Enterprise Roadmap Status
Completed:
0. Project Setup & Git
1. Common Library
2. Product Service
3. Inventory Service
4. Order Service
5. Core Backend Integration
6. React Setup
7. React Product Module
8. React Inventory Module
9. React Order Module
10. Discovery Server
11. API Gateway
14. Auth Service + JWT
15. React Auth Module
Pending:
12. Config Server + Config Repository
13. Secrets Management
16. Notification Service
17. Resilience4j
18. Zipkin
19. Prometheus + Grafana
20. Docker
21. Docker Compose
22. Kubernetes
23. CI/CD
24. Production Hardening
Next Phase
Phase 12 – Config Server + Config Repository
Implement:
- Root pom.xml module entry
- ms-9-config-server
- config-repo
- application.yml
- ConfigServerApplication.java
- Build and run instructions
- Test steps
Goal
- Centralized YAML configuration
- All services load configuration from Config Server
- Prepare for environment-based secrets in Phase 13
==================================================
WHEN TO TEST
============
After every phase:
1. Build
2. Run
3. Test functionality
4. Fix issues
5. Commit to Git
6. Proceed to next phase
==================================================
PORTFOLIO VALUE
===============
By completing all phases, you demonstrate:
* React Frontend
* Spring Boot Microservices
* Security
* Observability
* Docker
* Kubernetes
* CI/CD
* Production Engineering Practices
==================================================
NODE JS FOR REACT
===============
Installation Steps (Windows)
On the Node.js website, click the Windows Installer (.msi) for:
Node.js 24.15.0 LTS
Run the installer.
Keep all default settings.
Ensure Add to PATH is enabled.
Complete the installation.
Verify Installation
Open a new Command Prompt and run:
node -v
npm -v
Expected output:
v24.15.0
11.x.x
Next Step: Create React Project
After successful installation:
cd C:\Users\vin\OneDrive\Documents\Workspace\ms-1-order-management-system
npm create vite@latest ms-5-frontend-react -- --template react-ts
Then:
cd ms-5-frontend-react
npm install
npm install bootstrap axios react-router-dom
npm run dev
Open:
http://localhost:5173
Recommendation
Proceed with Node.js 24.15.0 LTS. It is stable and fully compatible with your React + Vite + TypeScript frontend setup.
---
Useful Commands
Start Frontend
cd ms-5-frontend-react
npm run dev
Install New Package
npm install <package-name>
Build Production Bundle
npm run build
Preview Production Build
npm run preview
Install Required Dependencies for This Project
cd ms-5-frontend-react
npm install bootstrap axios react-router-dom
npm install -D @types/bootstrap