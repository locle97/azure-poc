# Azure Application Gateway

This POC demonstrates the setup, configuration, and management of an Azure Application Gateway.

## Table of Contents

- [Definitions](#definitions)
- [Explanation](#explanation)
- [Azure Portal Steps](#azure-portal-steps)
- [Azure CLI Steps](#azure-cli-steps)

## Definitions

**Azure Application Gateway:** Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications. It offers various features including URL-based routing, SSL termination, session affinity, and Web Application Firewall (WAF) integration.

**Web Traffic Load Balancing:** Distributing incoming web traffic across multiple servers to ensure no single server becomes overwhelmed, thus improving availability and responsiveness.

**SSL Termination:** The process of decrypting SSL-encrypted traffic at the load balancer before passing it on to the web servers.

**Session Affinity:** Also known as sticky sessions, it directs requests from a particular client session to the same backend server during the session's lifetime.

## Explanation

Azure Application Gateway provides an application delivery controller (ADC) as a service, offering various Layer 7 load-balancing capabilities for your applications. It allows for more advanced routing, including path-based routing, multi-site hosting, and enhanced security with its integrated Web Application Firewall.

### Key Features:

- **URL-based Routing:** Direct traffic based on URL paths.
- **SSL Termination:** Simplify the certificate management by terminating SSL at the gateway.
- **Web Application Firewall:** Protect your applications from common threats and vulnerabilities.
- **Autoscaling:** Automatically scale the Application Gateway instance count based on traffic.

## Azure Portal Steps


### Step 1: Create Resource Group

1. Navigate to the [Azure Portal](https://portal.azure.com/).
2. Click on "Create a resource" and search for "Resource group".
3. Click "Create" and fill in the required details:
   - **Resource Group Name:** Enter a name for your resource group.
   - **Region:** Choose the region closest to your application users.
4. Click "Review + create" and then "Create".

### Step 2: Configure Virtual Network

1. In the Azure Portal, navigate to "Create a resource" and search for "Virtual Network".
2. Click "Create" and fill in the required details:
   - **Name:** Enter a name for your virtual network.
   - **Address Space:** Define the IP address range for the network.
   - **Subnets:** Add one or more subnets with their respective address ranges.
3. Click "Review + create" and then "Create".

### Step 3: Create Web App Service

1. In the Azure Portal, navigate to "Create a resource" and search for "Web App".
2. Click "Create" and fill in the required details:
   - **Name:** Enter a name for your web app.
   - **Publish:** Choose "Code" or "Docker Container".
   - **Runtime stack:** Select the runtime stack (e.g., .NET, Node.js).
   - **Operating System:** Choose Windows or Linux.
   - **Region:** Select the same region as your resource group.
   - **App Service Plan:** Create a new plan or use an existing one.
3. Click "Review + create" and then "Create".

### Step 4: Create Application Gateway

1. In the Azure Portal, navigate to "Create a resource" and search for "Application Gateway".
2. Click "Create" and fill in the required details:
   - **Resource Group:** Select the resource group you created.
   - **Application Gateway name:** Enter a name for your Application Gateway.
   - **Region:** Choose the same region as your resource group.
   - **Tier:** Select the appropriate tier (Standard_v2 or WAF_v2).
3. Click "Next: Frontends" and configure the frontend IP:
   - **Frontend IP address type:** Choose "Public" or "Private".
   - **Public IP address:** If you chose "Public", create a new public IP address or select an existing one.
4. Click "Next: Backends" and configure the backend pool:
   - **Add a backend pool:** Provide a name and add the IP addresses or FQDN of your backend servers.
5. Click "Next: Configuration" and set up routing rules:
   - **Listener:** Create a listener and specify the frontend IP and port.
   - **Backend targets:** Create a rule to route traffic from the listener to the backend pool.
6. Click "Review + create" and then "Create" to deploy the Application Gateway.

### Step 5: Link Web App Service to Virtual Network

1. Navigate to your Web App in the Azure Portal.
2. Under "Settings", select "Networking".
3. Click on "VNet Integration" and add your virtual network.
4. For Application Gateway, go to the "Settings" section, select "Backend pools", and add your Web App as a backend target.

### Step 6: Test

1. Once the Application Gateway is deployed and configured, navigate to the public IP address of the Application Gateway.
2. Verify that the traffic is correctly routed to your Web App.
3. Test SSL termination by accessing the Web App over HTTPS.
4. If WAF is enabled, test by simulating common web attacks and ensure they are blocked.
