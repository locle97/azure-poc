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

1. Navigate to the [Azure Portal resource group](https://portal.azure.com/#browse/resourcegroups).
2. Click on "Create"
3. Fill in the required details:
   - **Resource Group Name:** Enter a name for your resource group. (e.g: AGResourceGroup)
   - **Region:** Choose the region closest to your application users.
4. Click "Review + create" and then "Create".

### Step 2: Configure Virtual Network

1. In the Azure Portal, search for "Virtual Network" and navigate to it.
2. Click "Create" and fill in the required details:
   - **Resource group:** Select resource group which is created on step 1 .
   - **Name:** Enter a name for your virtual network. (e.g: AGVNet)
3. Click to "IP Addresses"
   - **Address range:** as default (10.0.0.0/16)
   - **Subnets:** Using 2 subnets:
        - default: 10.0.0.0/24
        - app: 10.0.1.0/24
3. Click "Review + create" and then "Create".

### Step 3: Create Web App Service

1. In the Azure Portal, and search for "App Service".
2. Click "Create" -> "+ Web App" and fill in the required details:
   - **Resource group:** Select resource group on step 1
   - **Name:** Enter a name for your web app. (e.g. agwebappservice)
   - **Publish:** Choose "Container"
   - **Operating System:** Choose "Linux"
   - **Region:** Select the same region as your resource group.
   - **App Service Plan:** Create a new plan or use an existing one.
3. Click "Next" to access tab "Container"
   - **Quickstart options:** Using sample container as NGINX
4. Click "Review + create" and then "Create".
5. Try to access created webapp via url [agwebappservice1.azurewebsites.net](https://agwebappservice1.azurewebsites.net/)

### Step 4: Create Application Gateway

1. In the Azure Portal, search for "Application Gateway".
2. Click "Create" and fill in the required details:
   - **Resource Group:** Select the resource group you created.
   - **Application Gateway name:** Enter a name for your Application Gateway. (e.g. AGApplicationGateway)
   - **Region:** Choose the same region as your resource group.
   - **Tier:** Select the appropriate tier (Standard_v2 or WAF_v2).
   - **Enable autoscaling:** No
   - **Instance count:** 1
   - **Virtual network:** Select the virtual network you created on step 2.
   - **Subnet:** Select "default" which created on step 2.
3. Click "Next: Frontends" and configure the frontend IP:
   - **Frontend IP address type:** Choose "Public"
   - **Public IP address:** If you chose "Public", create a new public IP address or select an existing one.
4. Click "Next: Backends" and configure the backend pool:
   - **Add a backend pool:** Provide a name and add the IP addresses or FQDN of your backend servers.
      - **Name:** Enter a name for backend pool (e.g. AGBackendPool)
      - **Target type:** Select "App Services"
      - **Target:** Select the web app service you created on step 3.
      - Click **Add**.
5. Click "Next: Configuration" and set up routing rules:
   - Click "Add a routing rule".
   - **Rule name:** Enter a rule name. (e.g. AGRule)
   - **Priority:** The priority value should be between 1 and 20000, where 1 represents highest priority and 20000 represents lowest.
   - **Listener:** Create a listener and specify the frontend IP and port.
      - **Listener name:** Enter listener name. (e.g. AGListener)
   - **Backend targets:** Create a rule to route traffic from the listener to the backend pool.
      - **Backend target:** Select the backend pool you added on mini-step 4.
      - **Backend settings:** Add new
         - **Backend settings name:** Enter backend settings name. (e.g. AGBackendSettings)
         - **Backend protocol: select HTTPS** (if you are connecting to AppService)
         - **Backend server’s certificate is issued by a well-known CA:** Yes
         - **Override with new host name: Yes**
         - **Host name override:** Pick host name from backend target
         - Click "Add"
   - Click "Add"
6. Click "Review + create" and then "Create" to deploy the Application Gateway.

### Step 5: Link Web App Service to Virtual Network

1. Navigate to your Web App in the Azure Portal.
2. Under "Settings", select "Networking".
3. Click on "VNet Integration" and add your virtual network.
4. For Application Gateway, go to the "Settings" section.
5. Navigate to your virutla network.
6. Under "Settings", select "Service endpoints", click "Add"
   - **Service:** Select Microsoft.Web.
   - **Subnet:** Select "app"

### Step 6: Test

1. Once the Application Gateway is deployed and configured, navigate to the public IP address of the Application Gateway.
2. Verify that the traffic is correctly routed to your Web App.
