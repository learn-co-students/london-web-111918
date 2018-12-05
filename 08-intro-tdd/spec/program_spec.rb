require_relative '../program'

describe "is_palindrome?" do
  it 'should return true if the string is a palindrome' do
    expect(is_palindrome?('kayak')).to be(true)
  end

  it 'should return false if the string is not a palindrome' do
    expect(is_palindrome?('kayaks')).to be(false)
  end

  it 'should return true if the input has spaces and is a palindrome' do
    expect(is_palindrome?('a lad named e mandala')).to be(true)
  end

  it 'should return false if the input has spaces and is not a palindrome' do
    expect(is_palindrome?('glovebox is full')).to be(false)
  end

  it 'should return true if the input has spaces and is a palindrome and has capital letters' do
    expect(is_palindrome?('A lad named E mandala')).to be(true)
  end

  it 'should return false if the input has spaces and is not a palindrome and has capital letters' do
    expect(is_palindrome?('gloveBox iS full')).to be(false)
  end

  it 'should return true if the input has spaces and is a palindrome and has capital letters and puncuation' do
    expect(is_palindrome?('A lad named E. mandala!')).to be(true)
  end

  it 'should return false if the input has spaces and is not a palindrome and has capital letters and puncuation' do
    expect(is_palindrome?('gloveBox! iS fu.ll')).to be(false)
  end

  it 'should raise an error if given an int' do
      expect { is_palindrome?(131) }.to raise_error(ArgumentError)
  end

  it 'should raise an error if passed nil' do
      expect { is_palindrome?(nil) }.to raise_error(ArgumentError)
  end

  it 'should raise an error if passed an empty string' do
      expect { is_palindrome?('') }.to raise_error(ArgumentError)
  end

  it 'should raise an error if given a string of length one' do
      expect { is_palindrome?('a') }.to raise_error(ArgumentError)
  end
end
