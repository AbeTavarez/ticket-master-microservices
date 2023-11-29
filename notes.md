


### TypeScript

 - Create config file `tsc --init`

### Flow

 1. Create micro-service directories and files
 2. Create Dockerfile and image
 3. Create Kubernetes Deployment and Service

=== Skaffold.yaml
apiVersion: skaffold/v2alpha3
kind: Config 
deploy:
  kubectl:
    manifests:
     - ./insfra/k8s/*
build:
  local: 
    push: false
  # googleCloudBuild:
  #   projectId: excellent-guard-405400
  artifacts: 
    - image: attacktitan/auth
    # - image: us.gcr.io/excellent-guard-405400/auth
      context: auth
      docker: 
        dockerfile: Dockerfile
      sync: 
        manual:
          - src: 'src/**/*.ts'
            dest: .
=======================
auth-depl.yaml
================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth
          image: us.gcr.io/excellent-guard-405400/auth
---
# Default Cluster IP Service
apiVersion: v1
kind: Service
metadata:
  name: auth-srv
spec:
  selector:
    app: auth
  ports:
    - name: auth
      protocol: TCP 
      port: 3000
      targetPort: 3000
    
===========================