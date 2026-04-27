#!/bin/bash
# SSL setup via Let's Encrypt (certbot standalone)
# Uso: sudo bash scripts/setup-ssl.sh hidra.cl contacto@hidra.cl

set -e

DOMAIN=${1:-hidra.cl}
EMAIL=${2:-contacto@hidra.cl}

echo ">>> Configurando SSL para $DOMAIN"

# Instalar certbot si no está
if ! command -v certbot &> /dev/null; then
  apt-get update -qq
  apt-get install -y certbot
fi

# Obtener certificado (detiene temporalmente el puerto 80)
certbot certonly \
  --standalone \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

echo ">>> Certificado obtenido en /etc/letsencrypt/live/$DOMAIN/"

# Renovación automática via cron
CRON_JOB="0 3 * * * certbot renew --quiet --standalone"
(crontab -l 2>/dev/null | grep -q "certbot renew") || (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo ">>> Renovación automática configurada (diario a las 3am)"
echo ">>> Rutas:"
echo "    Cert:    /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
echo "    Key:     /etc/letsencrypt/live/$DOMAIN/privkey.pem"
