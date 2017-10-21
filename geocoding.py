import googlemaps
from datetime import datetime
import csv
import sys


def main(args):
	print args[0]
	print args[1]
	file1 = open(args[1], 'rU')
	reader = csv.reader(file1)
	next(reader)
	file2 = open(args[2], 'a')
	writer = csv.writer(file2)
	gmaps = googlemaps.Client(key='AIzaSyDAiwhAdxaUTv6YDig4wY9SU-2nI6cLhJI')

	# Geocoding an address
	addresses = []
	for row in reader:
		#address = row[3] + " " + row[2] + ", " + row[1]
		address = row[0]
		geocode_result = gmaps.geocode(address)
		lat = geocode_result[0]['geometry']['location']['lat']
		lng = geocode_result[0]['geometry']['location']['lng']
		row.append(lat)
		row.append(lng)
		print row
		writer.writerow(row)
		#print row
		#addresses.append()
	


if __name__ == "__main__":
	main(sys.argv)