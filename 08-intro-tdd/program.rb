def is_palindrome?(string_of_chars)

  if string_of_chars.class != String || string_of_chars.length <= 1
     raise ArgumentError.new('Input must be a string!')
  end

  string_of_chars = string_of_chars
    .gsub(/\W/, '')
    .downcase

  string_of_chars == string_of_chars.reverse
end
