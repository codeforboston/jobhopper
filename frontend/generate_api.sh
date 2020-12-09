# Set script directory as working directory
cd "${0%/*}"

# Uncomment to generate schema with Django
# docker-compose \
#     -f ../docker/docker-compose.yml \
#     --env-file ../docker/.env \
#     exec api python3 manage.py generateschema > generated.yml

rm -rf src/api

docker run \
    --rm \
    -v "$PWD:/local" \
    -e JAVA_OPTS="-Dlog.level=warn" \
    openapitools/openapi-generator-cli:v4.3.1 \
    generate \
    -i local/schema.yaml \
    -g javascript \
    -o local/src/api \
    -p projectName=JobsAPI \
    -p usePromises=true \