class User < ApplicationRecord
  has_secure_password

  has_many :journal_entries, dependent: :destroy

  def to_token_payload
    {
      sub: id,
      email: email
    }
  end
end
