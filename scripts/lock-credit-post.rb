#!/usr/bin/env ruby
# Regenerate the encrypted article after editing _drafts/payments-101-credit-card-chronology.md.
# Run with CREDIT_POST_PASSWORD set to the current article password.
require "base64"
require "json"
require "nokogiri"
require "openssl"
require "tmpdir"

ROOT = File.expand_path("..", __dir__)
OUTPUT = File.join(ROOT, "assets", "data", "credit-card-chronology.json")
password = ENV.fetch("CREDIT_POST_PASSWORD")

Dir.mktmpdir("credit-card-post-") do |destination|
  Dir.chdir(ROOT) do
    abort "Jekyll build failed" unless system("bundle", "exec", "jekyll", "build", "--safe", "--drafts", "--quiet", "--destination", destination)
  end

  page = File.join(destination, "credit-card-source", "index.html")
  section = Nokogiri::HTML(File.read(page)).at_css("section.page__content")
  abort "Article content was not found" unless section

  salt = OpenSSL::Random.random_bytes(16)
  iv = OpenSSL::Random.random_bytes(12)
  key = OpenSSL::PKCS5.pbkdf2_hmac(password, salt, 250_000, 32, "sha256")
  cipher = OpenSSL::Cipher.new("aes-256-gcm")
  cipher.encrypt
  cipher.key = key
  cipher.iv = iv
  encrypted = cipher.update(section.inner_html) + cipher.final

  Dir.mkdir(File.dirname(OUTPUT)) unless Dir.exist?(File.dirname(OUTPUT))
  File.write(OUTPUT, JSON.generate({
    salt: Base64.strict_encode64(salt),
    iv: Base64.strict_encode64(iv),
    data: Base64.strict_encode64(encrypted + cipher.auth_tag)
  }))
end

puts "Updated #{OUTPUT}"
